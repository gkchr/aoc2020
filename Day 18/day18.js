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
        .map(line => line.split("").filter(i => i && i !==  " "));


    console.log("--- part 1 ---", part1(input));

    console.log("--- part 2 ---", part2(input));
});



/**
 * the operation function.
 */
function operate(a, b) {
    if(!a.op) return b;
    if(a.op === "+") return a.res + b;
    if(a.op === "*") return a.res * b;
}



/**
 * the daily challenge, part 1.
 *
 * https://adventofcode.com/2020/day/18
 */
function part1(input) {
    let results = [];

    input.forEach(line => {
        let stack = [];
        stack.push({res: 0, op: null});

        line.forEach(char => {
            switch (char) {
                case "*":
                    stack[stack.length-1].op = "*";
                    break;
                case "+":
                    stack[stack.length-1].op = "+";
                    break;
                case "(":
                    stack.push({res: 0, op: null});
                    break;
                case ")":
                    let inside = stack.pop();
                    stack[stack.length-1].res = operate(stack[stack.length-1], inside.res);
                    break;
                default:
                    stack[stack.length-1].res = operate(stack[stack.length-1], parseInt(char));
            }
        });

        if(stack.length < 1) console.error(stack);
        results.push(stack[0].res);
    });

    return results.reduce((a,b) => a+b);
}



/**
 * the daily challenge, part 2.
 *
 * https://adventofcode.com/2020/day/18
 */
function part2(input) {
}