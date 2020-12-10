const fs = require('fs');



/**
 * read and prepare input and run the challenge.
 */
fs.readFile('input.txt', 'utf8', function (err, data) {
    if (err) {
        return console.error(err);
    }

    /**
     * split input.
     */
    let input = data
        .replace(/(\r\n|\n|\r)/gm, "\n")
        .split("\n")
        .filter(i => i)
        .map(i => parseInt(i));

    console.log("--- part 1 ---", part1(input));

    console.log("--- part 2 ---", part2(input));
});



/**
 * the daily challenge, part 1.
 *
 * https://adventofcode.com/2020/day/10
 */
function part1(input) {
    let max = Math.max(...input);
    let current = 0;
    let count = [NaN, 0, 0, 1]; // 1: 0,   2: 0,   3: 0+last->device

    while(current < max) {
        for(let i = 1; i <= 3; ++i) {
            if(input.includes(current + i)) {
                current += i;
                count[i]++;
                break;
            }
        }
    }

    return count[1]*count[3];
}



/**
 * the daily challenge, part 2.
 *
 * https://adventofcode.com/2020/day/10
 */
function part2(input) {

}
