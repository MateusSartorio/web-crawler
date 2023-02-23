function normalizeURL(urlString) {
    const trailingSlashRe = /\/$/;

    const newURL = new URL(urlString);
    let normalizedURL = `${newURL.hostname}${newURL.pathname.replace(trailingSlashRe, "")}`;

    return normalizedURL;
}

module.exports = {
    normalizeURL
};
