const { sortPages } = require("./report.js");

test("sortPages 2 pages", () => {
    const input = {
        "blog.boot.dev/path": 1,
        "blog.boot.dev": 3,
    };

    const actual = sortPages(input);
    const expected = [
        ["blog.boot.dev", 3],
        ["blog.boot.dev/path", 1]
    ];

    expect(actual).toEqual(expected);
});

test("sortPages 5 pages", () => {
    const input = {
        "blog.boot.dev/path": 1,
        "blog.boot.dev": 3,
        "blog.boot.dev/path2": 5,
        "blog.boot.dev/path3": 2,
        "blog.boot.dev/path4": 9,
    };

    const actual = sortPages(input);
    const expected = [
        ["blog.boot.dev/path4", 9],
        ["blog.boot.dev/path2", 5],
        ["blog.boot.dev", 3],
        ["blog.boot.dev/path3", 2],
        ["blog.boot.dev/path", 1],
    ];

    expect(actual).toEqual(expected);
});
