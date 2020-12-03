const fs = require('fs');



/**
 * read and prepare input and run the challenge.
 */
fs.readFile('input.txt', 'utf8', function (err, data) {
    if (err) {
        return console.error(err);
    }

    let input = data.replace(/(\r\n|\n|\r)/gm,"\n").split("\n").filter(i => i);



    /**
     * split input into 2d array.
     */
    let field = input.map((line) => {return line.split("")});

    console.log("--- part 1 ---");
    part1(field);

    console.log("--- part 2 ---");
    part2(field);
});



/**
 * the daily challenge, part 1.
 *
 * https://adventofcode.com/2020/day/2
 */
function part1(field) {
    let count = 0;

    let height = field.length;
    let width = field[0].length;
    for(let h = 1; h < height; ++h) {
        if(field[h][(h*3)%width] === "#") count++;
    }

    console.log(count);
}



/**
 * the daily challenge, part 2.
 *
 * https://adventofcode.com/2020/day/2
 */
function part2(field) {
    function slide(field, routes) {
        let totalCount = 1;
        let height = field.length;
        let width = field[0].length;
        for(let route of routes) {
            let count = 0;
            for(let h = 0; h < height; h+=route.y) {
                if(field[h][(h/route.y*route.x)%width] === "#") count++;
            }
            console.log(route, count);
            totalCount *= count;
        }
        return totalCount;
    }

    console.log(slide(field, [
        {x:1, y:1},    // Right 1, down 1.
        {x:3, y:1},    // Right 3, down 1. (This is the slope you already checked.)
        {x:5, y:1},    // Right 5, down 1.
        {x:7, y:1},    // Right 7, down 1.
        {x:1, y:2},    // Right 1, down 2.
    ]));
}