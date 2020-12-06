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
    let input = data.replace(/(\r\n|\n|\r)/gm,"\n").split("\n\n").filter(i => i);

    console.log("--- part 1 ---", part1(input));

    console.log("--- part 2 ---", part2(input));
});



/**
 * the daily challenge, part 1.
 *
 * https://adventofcode.com/2020/day/6
 */
function part1(groups) {
    let count = 0;

    groups.forEach((group) => {
        let answers = [];

        group.split("\n")
            .map((person) => {
                answers = answers.concat(person.split(""));
            });

        answers = answers.filter((value, index, self) => { return self.indexOf(value) === index; });

        count += answers.length;
    });

    return count;
}



/**
 * the daily challenge, part 2.
 *
 * https://adventofcode.com/2020/day/6
 */
function part2(groups) {
    let count = 0;

    groups.forEach((group) => {
        let answers = null;

        let persons = group.split("\n").filter(i => i);
        for(let person of persons) {
            person = person.split("");
            if(answers === null) {
                answers = person;
            } else {
                answers = answers.filter((a) => { return person.includes(a); });
            }
        }

        console.log(persons, answers, answers.length);
        count += answers.length;
    });

    return count;
}