// google-analytics
!function(e, t, n, a, c, o, s) {
    e.GoogleAnalyticsObject = c, e[c] = e[c] || function() {(e[c].q = e[c].q || []).push(arguments);}, e[c].l = 1 * new Date, o = t.createElement(
        n), s = t.getElementsByTagName(n)[0], o.async = 1, o.src = 'https://www.google-analytics.com/analytics.js', s.parentNode.insertBefore(o, s);
}(window, document, 'script', 0, 'ga');

ga('create', 'UA-51020929-7', 'auto');
ga('send', 'pageview');

if (chrome.app.isInstalled) {
    console.log('installed!');
}

if (!window.chrome || false) {
    document.body.className = 'not-chrome';
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