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
        .map(instruction => {
            let part = instruction.split(" ");
            return {ins: part[0], val: parseInt(part[1])};
        });

    console.log("--- part 1 ---", part1(input));

    console.log("--- part 2 ---", part2(input));
});



/**
 * the daily challenge, part 1.
 *
 * https://adventofcode.com/2020/day/8
 */
function part1(input) {
    let visited = [];
    let position = 0;
    let accumulator = 0;

    while(!visited.includes(position)) {
        visited.push(position);
        let instruction = input[position];
        switch (instruction.ins) {
            case "jmp":
                position += instruction.val;
                break;
            case "acc":
                accumulator += instruction.val;
                position += 1;
                break;
            default:
                position += 1;
                break;
        }
    }

    return accumulator;
}



/**
 * the daily challenge, part 2.
 *
 * https://adventofcode.com/2020/day/8
 */
function part2(input) {
}