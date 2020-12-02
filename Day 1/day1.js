const fs = require('fs');



/**
 * read input and run the challenge.
 */
fs.readFile('input.txt', 'utf8', function (err, data) {
    if (err) {
        return console.error(err);
    }

    let input = data.split("\r\n").filter(i => i);

    console.log("--- part 1 ---");
    part1(input);

    console.log("--- part 2 ---");
    part2(input);
});



/**
 * the daily challenge, part 1.
 *
 * https://adventofcode.com/2020/day/1
 */
function part1(input) {
    for(let i in input) {
        for(let j = +i+1; j < input.length; ++j) {
            if(+input[i] + +input[j] === 2020) {
                console.log(input[i] * input[j]);
            }
        }
    }
}



/**
 * the daily challenge, part 2.
 *
 * https://adventofcode.com/2020/day/1
 */
function part2(input) {
    for(let i in input) {
        for(let j = +i+1; j < input.length; ++j) {
            if(+input[i] + +input[j] <= 2020) {
                for(let k = +j+1; k < input.length; ++k) {
                    if(+input[i] + +input[j] + +input[k] === 2020) {
                        console.log(input[i] * input[j] * input[k]);
                    }
                }
            }
        }
    }
}