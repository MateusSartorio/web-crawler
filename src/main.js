const { crawlPage } = require("./crawl");

async function main() {
    if(process.argv.length < 3) {
        console.log("no website provided");
        process.exit(1);
    }
    else if(process.argv.length > 3) {
        console.log("only one website is supported");
        process.exit(1);
    }

    const baseURL = process.argv[2];
    console.log(`starting crawl of ${baseURL}`);

    let pages = {};
    pages = await crawlPage(baseURL, baseURL, pages);

    for(const page in pages)
        console.log(`${page}: ${pages[page]}`);
}

main();