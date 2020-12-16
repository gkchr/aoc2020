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
        .split(",")
        .filter(i => i);

    console.log("--- part 1 ---", part1(input, 2020));

    console.log("--- part 2 ---", part1(input, 30000000));
});



/**
 * the daily challenge.
 *
 * https://adventofcode.com/2020/day/15
 */
function part1(input, until) {
    let spoken = {};
    let last = input.pop();

    input.forEach((v, k) => spoken[v] = k);
    console.log("0,1", ":  ", spoken);

    let i = input.length;

    for(i; i < until-1; ++i) {
        let next;
        // console.log(i, ":  ", last, spoken);
        if(Object.keys(spoken).includes(last.toString())) {
            next = i - spoken[last];
            // spoken[last] = i - spoken[last];
        } else {
            next = 0;
        }
        spoken[last] = i;
        last = next;
    }

    return last;
}