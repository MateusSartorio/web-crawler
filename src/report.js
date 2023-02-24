function printReport(pages) {
    const sortedPages = sortPages(pages);

    console.log("=======================");
    console.log("REPORT");
    console.log("=======================");
    
    for(const page of sortedPages)
        console.log(`Found ${page[1]} links to page: ${page[0]}`);

    console.log("=======================");
    console.log("END REPORT");
    console.log("=======================");
}

function sortPages(pages) {
    const pagesArray = Object.entries(pages);
    pagesArray.sort((a, b) => b[1] - a[1]);
    
    return pagesArray;
}

module.exports = {
    sortPages,
    printReport
}
