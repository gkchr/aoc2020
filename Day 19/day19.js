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


    console.log("--- part 1 ---", part1(rules, messages));

    // console.log("--- part 2 ---", part2(rules, messages));
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

    check(input, pos, rulesArr) {
        // console.log("checking", input, pos, this);

        if(this.letter) { // only letter
            return {is: input[pos] === this.letter, checked: pos+1};
        }

        // complicated rule
        for(let side of this.rules) {
            let checked = pos;

            for(let rule of side) {
                let result = rulesArr[rule].check(input, checked, rulesArr);
                if(result.is) {
                    checked = result.checked;
                } else {
                    checked = pos;
                    break;
                }
            }

            if(checked > pos) {
                return {is: true, checked: checked};
            }
        }

        return {is: false, checked: 0};
    }
}



/**
 * the daily challenge, part 1.
 *
 * https://adventofcode.com/2020/day/19
 */
function part1(rules, messages) {
    rules = rules.split("\n").filter(i => i).map(r => r.split(": "));
    let theRules = {};
    for(let input of rules) {
        theRules[input[0]] = new Rule(input[1]);
    }

    let count = 0;
    messages = messages.split("\n").filter(i => i);
    for(let msg of messages) {
        let result = theRules[0].check(msg.split(""), 0, theRules);
        if(result.is && result.checked === msg.length) count++;
    }
    return count;
}