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
    let [rules, messages] = data
        .replace(/(\r\n|\n|\r)/gm, "\n")
        .split("\n\n");

    rules = rules.split("\n").filter(i => i);

    console.log("--- part 1 ---", part1(rules, messages));

    console.log("--- part 2 ---", part2(rules, messages));
});



/**
 * the Rule class.
 */
class Rule {
    constructor(input) {
        if(input.indexOf("\"") !== -1) { // only letter
            this.letter = input.split("")[1];

        } else { // complicated rule
            this.rules = [];
            let parts = input.split("|");
            for(let part of parts) {
                part = part.split(" ").filter(i => i);
                this.rules.push(part);
            }
        }
    }
}

function check(input, allRules, [rule, ...rest]) {
    // console.log("checking", input, pos, this);
    if (!rule || !input) return !rule && !input;

    if(allRules[rule].letter) { // only letter
        return input[0] === allRules[rule].letter && check(input.slice(1), allRules, rest);
    }

    // complicated rule
    return allRules[rule].rules.some(r => check(input, allRules, r.concat(rest)));
}


/**
 * the daily challenge, part 1.
 *
 * https://adventofcode.com/2020/day/19
 */
function part1(rules, messages) {
    rules = rules.map(r => r.split(": "));
    let theRules = {};
    for(let input of rules) {
        theRules[input[0]] = new Rule(input[1]);
    }

    let count = 0;
    messages = messages.split("\n").filter(i => i);
    for(let msg of messages) {
        let result = check(msg, theRules, ["0"]);
        if(result) count++;
    }
    return count;
}



/**
 * the daily challenge, part 2.
 *
 * https://adventofcode.com/2020/day/19
 */
function part2(rules, messages) {
    for(let i in rules) {
        if(rules[i].indexOf("8:") === 0) rules[i] = "8: 42 | 42 8";
        if(rules[i].indexOf("11:") === 0) rules[i] = "11: 42 31 | 42 11 31";
    }
    return part1(rules, messages);
}