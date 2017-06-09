const defaultCommandIcon = 'https://backtick.ninja/assets/images/command-default.png';

getJSON('https://backtick.ninja/library/commands.json')
    .then(libraryCommands => {

        document.querySelector('.commands-list')
            .innerHTML = libraryCommands.map(buildCommandHtml).join('');
    });

getJSON('/gist-forks.json')
    .then(gistForks => {

        document.querySelector('.gists-list')
            .innerHTML = gistForks.map(buildGistHtml).join('');

    });

function buildCommandHtml(command) {
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

function buildGistHtml(gist) {
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