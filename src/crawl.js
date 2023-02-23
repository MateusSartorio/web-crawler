const { JSDOM } = require("jsdom");

function getURLsFromHTML(HTMLBody, baseURL) {
    const urls = [];
    
    const dom = new JSDOM(HTMLBody).window.document;
    const linkElements = dom.querySelectorAll("a");

    for(linkElement of linkElements) {
        if(linkElement.href[0] == "/") {
            try {
                const newURL = new URL(`${baseURL}${linkElement.href}`);
                urls.push(normalizeURL(`${baseURL}${linkElement.href}`));
            }
            catch(e) {
                console.log(`error with relative url: ${e.message}`);
            }
        }
        else {
            try {
                const newURL = new URL(linkElement.href);
                urls.push(normalizeURL(linkElement.href));
            }
            catch(e) {
                console.log(`error with absolute url: ${e.message}`);
            }
        }
    }

    return urls;
}

function normalizeURL(urlString) {
    const trailingSlashRe = /\/$/;

    const newURL = new URL(urlString);
    let normalizedURL = `${newURL.hostname}${newURL.pathname.replace(trailingSlashRe, "")}`;

    return normalizedURL;
}

module.exports = {
    normalizeURL,
    getURLsFromHTML
};
