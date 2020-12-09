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
        .map(i => parseInt(i)); // damn js and its strings...

    console.log("--- part 1 ---", part1(input));

    console.log("--- part 2 ---", part2(input));
});



/**
 * the functions to search for the number combination.
 */
function isCombination(num, arr) {
    for(let i = 0; i < arr.length; ++i) {
        for(let j = i; j < arr.length; ++j) {
            if(arr[i] + arr[j] === num) {
                return true;
            }
        }
    }
    return false;
}

function findCombination(num, arr) {
    for(let i = 0; i < arr.length; ++i) {
        let sum = arr[i];
        let summands = [arr[i]];
        for(let j = i+1; j < arr.length; ++j) {
            sum += arr[j];
            if(sum > num) break;
            summands.push(arr[j]);
            if(sum === num) {
                let result = Math.min(...summands) + Math.max(...summands);
                return {summands: summands, result: result};
            }
        }
    }
    return false;
}



/**
 * the daily challenge, part 1.
 *
 * https://adventofcode.com/2020/day/9
 */
function part1(input) {
    let last25 = input.slice(0, 25);
    for(let i = 25; i < input.length; ++i) {
        if(!isCombination(input[i], last25)) return input[i];
        last25.shift();
        last25.push(input[i]);
    }

    return undefined;
}



/**
 * the daily challenge, part 2.
 *
 * https://adventofcode.com/2020/day/9
 */
function part2(input) {
    let last25 = input.slice(0, 25);
    for(let i = 25; i < input.length; ++i) {
        if(!isCombination(input[i], last25)) return findCombination(input[i], input);
        last25.shift();
        last25.push(input[i]);
    }

    return undefined;
}