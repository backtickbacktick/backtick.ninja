// google-analytics
!function(e, t, n, a, c, o, s) {
    e.GoogleAnalyticsObject = c, e[c] = e[c] || function() {(e[c].q = e[c].q || []).push(arguments);}, e[c].l = 1 * new Date, o = t.createElement(
        n), s = t.getElementsByTagName(n)[0], o.async = 1, o.src = 'https://www.google-analytics.com/analytics.js', s.parentNode.insertBefore(o, s);
}(window, document, 'script', 0, 'ga');

ga('create', 'UA-51020929-7', 'auto');
ga('send', 'pageview');

if (typeof window.chrome === 'undefined') {

    document.body.className = 'not-chrome';

} else {

    if (chrome.app.isInstalled) {
        console.log('installed!');
    }

    const defaultCommandIcon = 'https://backtick.ninja/assets/images/command-default.png';

    getJSON('https://backtick.ninja/library/commands.json')
        .then(libraryCommands => {
            document.querySelector('.commands-list')
                .innerHTML = libraryCommands.map(buildHtmlCommand).join('');
        });

    getJSON('/gist-forks.json')
        .then(gistForks => {
            document.querySelector('.gists-list')
                .innerHTML = gistForks.map(buildHtmlGist).join('');
        });
}

function getJSON(url) {

    if (url.indexOf('/') === 0 && url.indexOf('//') !== 0) {
        url = window.location.origin + url;
    }

    return new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.onload = () => {
            if (request.status >= 200 && request.status < 400) {
                // Success!
                resolve(JSON.parse(request.responseText));
            } else {
                reject(request.response);
            }
        };
        request.onerror = (error) => reject(error);
        request.send();
    });
}

function buildHtmlCommand(command) {
    command = Object.assign({ link: '', icon: defaultCommandIcon }, command);
    return `
<li class="command" id="command-${command.slug}">
    <div class="icon" style="background-image: url(${command.icon})"></div>
    <div class="body">
        <span class="name">${command.name}</span>
        <p class="description">${command.description}</p>
        ` + (command.link ? `<a class="link" href="${command.link}">${command.link}</a>` : '') + `
    </div>
</li>`;
}

function buildHtmlGist(gist) {
    return `
<li class="command gist">
    <div class="body">
        <span class="name">${gist.name}</span>
        <p class="description">${gist.description}</p>
        <span class="author"><a href="https://github.com/${gist.login}">${gist.login}</a></span>
        ` + (gist.link ? `<a class="link" href="${gist.link}">View Gist (${gist.id})</a>` : '') + `
    </div>
</li>`;
}