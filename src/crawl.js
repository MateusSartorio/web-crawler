const { JSDOM } = require("jsdom");

async function crawlPage(baseURL, currentURL, pages) {
    const baseURLObj = new URL(baseURL);
    const currentURLObj = new URL(currentURL);
    
    if(baseURLObj.hostname !== currentURLObj.hostname)
        return pages;
    
    const normalizedCurrentURL = normalizeURL(currentURL);
    if(pages[normalizedCurrentURL] > 0) {
        pages[normalizedCurrentURL]++;
        return pages;
    }
    
    pages[normalizedCurrentURL] = 1;
    console.log(`actively crawling: ${currentURL}`);

    try {
        const response = await fetch(currentURL);
        if(response.status < 200 || response.status > 399) {
            console.log(`error in fetch with status code: ${response.status} on page: ${currentURL}`);
            return pages;
        }
        
        const contentType = response.headers.get("content-type");
        if(!contentType.toLowerCase().includes("text/html")) {
            console.log(`non HTML response, content type: ${contentType} on page: ${currentURL}`);
            return;
        }

        const htmlBody = await response.text();
        const nextURLs = getURLsFromHTML(htmlBody, currentURL);

        for(const nextURL of nextURLs)
        //     pages = await crawlPage(baseURL, nextURL, pages);
                console.log(nextURL)
    }
    catch(e) {
        console.log(`error fetching url: ${e.message} on page: ${currentURL}`);
    }

    return pages;
}

function getURLsFromHTML(HTMLBody, baseURL) {
    const urls = [];
    
    const dom = new JSDOM(HTMLBody).window.document;
    const linkElements = dom.querySelectorAll("a");

    for(linkElement of linkElements) {
        if(linkElement.href[0] != "h") {
            try {
                const newURL = new URL(`${baseURL}${linkElement.href}`);
                urls.push(normalizeURL(`${baseURL}${linkElement.href}`));
            }
            catch(e) {
                console.log(`error with relative url <${baseURL}${linkElement.href}>: ${e.message}`);
            }
        }
        else {
            try {
                const newURL = new URL(linkElement.href);
                urls.push(normalizeURL(linkElement.href));
            }
            catch(e) {
                console.log(`error with absolute url <${linkElement.href}>: ${e.message}`);
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
    getURLsFromHTML,
    crawlPage
};
