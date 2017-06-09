const request = require('request');
const fs = require('fs-extra');
const tokens = [fs.readFileSync('./token7.txt', 'utf8').trim()];

const perPage = 100;

let tokenIndex = 0;
const getToken = function() {
    if (++tokenIndex === tokens.length) {
        tokenIndex = 0;
    }
    return tokens[tokenIndex];
};

function getJson(url, params) {

    params = Object.assign({ access_token: getToken() }, params);

    url += '?' + Object.keys(params).map(key => key + '=' + params[key]).join('&');

    console.log(url);

    return new Promise((resolve, reject) => {
        let options = {
            url,
            headers: {
                'User-Agent': 'Backtick.io Forks Crawler (lyoshenka.github.io/backticklist)'
            }
        };
        request(options, function(error, response, body) {
            if (!error && response.statusCode === 200) {
                try {
                    resolve(JSON.parse(body));
                } catch (e) {
                    reject('Not valid JSON');
                }
            }
            reject({ error, response: response.statusCode, url });
        });

    });
}

function getOriginalForks({ page, allItems }) {

    let url = 'https://api.github.com/gists/6859173/forks';

    return getJson(url, { page, per_page: perPage })
        .then(items => {

            if (items.length === 0) {
                return Promise.resolve(allItems);
            }

            allItems = allItems.concat(items);

            return Promise.resolve(getOriginalForks({ page: page + 1, allItems }));
        });
}

function getForkGists(forks) {

    return Promise.all(forks.map(fork => {

        return getJson(fork.url)
            .catch(() => {
                return Promise.resolve(false);
            })
            .then(gist => {

                if (gist) {
                    try {
                        fork.gist = JSON.parse(gist.files['command.json'].content);
                    } catch (e) { }
                }

                return Promise.resolve(fork);
            });
    }));
}

Promise.resolve({ page: 1, allItems: [] })
    .then(getOriginalForks)
    .then(getForkGists)
    .then(forks => {

        console.log('forks.length: ' + (forks.length));
        console.log('typeof forks: ' + (typeof forks));

        let forkItems = forks
            .filter(fork => {
                return fork && fork.gist && fork.gist.name && fork.gist.name !== 'Example Command';
            })
            .map(fork => {
                return {
                    name: fork.gist.name,
                    description: fork.gist.description,
                    login: fork.owner.login,
                    id: fork.id,
                    link: fork.html_url
                };
            });

        fs.writeJsonSync('./gist-forks.json', forkItems);

        return console.log('Done!');
    })
    .catch(err => {
        console.error('Error: ', err);
        console.error('forkItems: ', forkItems.length);
    });