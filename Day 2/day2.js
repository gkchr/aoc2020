const fs = require('fs');



/**
 * read and prepare input and run the challenge.
 */
fs.readFile('input.txt', 'utf8', function (err, data) {
    if (err) {
        return console.error(err);
    }

    let input = data.split("\r\n").filter(i => i);


    /**
     * split input parts using RegEx.
     */
    let pass = [];
    input.forEach(function(i){
        let regex = /(\d+)-(\d+) (\w+): (\w+)/;

        let line = regex.exec(i);
        pass.push({
            min: line[1],
            max: line[2],
            letter: line[3],
            word: line[4],
        });
    });

    console.log("--- part 1 ---");
    part1(pass);

    console.log("--- part 2 ---");
    part2(pass);
});



/**
 * the daily challenge, part 1.
 *
 * https://adventofcode.com/2020/day/2
 */
function part1(input) {
    let count = 0;

    input.forEach((pass) => {
        let found = pass.word.split(pass.letter).length - 1;
        if (found >= pass.min && found <= pass.max) count++;
    });

    console.log(count);
}



/**
 * the daily challenge, part 2.
 *
 * https://adventofcode.com/2020/day/2
 */
function part2(input) {
    let count = 0;

    input.forEach((pass) => {
        if (pass.word[pass.min-1] === pass.letter ^ pass.word[pass.max-1] === pass.letter) count++;
    });

    console.log(count);
}