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
    let input = data.replace(/(\r\n|\n|\r)/gm,"\n").split("\n").filter(i => i);

    let boardingPasses = input.map((bPass) => {
        return bPass
            .replace(/[FL]/g, 0)
            .replace(/[BR]/g, 1)
        // return [bPass.substring(0, 7), bPass.substring(7)];
    });

    console.log("--- part 1 ---");
    part1(boardingPasses);

    console.log("--- part 2 ---");
    part2(boardingPasses);
});



/**
 * the daily challenge, part 1.
 *
 * https://adventofcode.com/2020/day/5
 */
function part1(boradingPasses) {
    let maxId = Math.max.apply(Math, boradingPasses.map(function(pass) { return parseInt(pass, 2); }));
    console.log(maxId);
}



/**
 * the daily challenge, part 2.
 *
 * https://adventofcode.com/2020/day/5
 */
function part2(boardingPasses) {
    boardingPasses = boardingPasses.map((pass) => { return parseInt(pass, 2); });

    boardingPasses.forEach((id) => {
        if(!boardingPasses.includes(1+id) && boardingPasses.includes(2+id)) {
            console.log(1+id);
        }
    });
}