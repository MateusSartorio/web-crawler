function printReport(sortedPages) {
    console.log("=======================");
    console.log("REPORT");
    console.log("=======================");
    
    for(const page in sortedPages)
        console.log(`Found ${pages[page]} links to page: ${page}`);

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
    sortPages
    printReport
}
