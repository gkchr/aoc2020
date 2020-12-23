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
        .filter(i => i)[0]
        .split("")
        .map(Number);


    console.log("--- part 1 ---", part1(input));

    console.log("--- part 2 ---", part2(input));
});



/**
 * the daily challenge, part 1.
 *
 * https://adventofcode.com/2020/day/23
 */
function part1(circle) {
    let currentCup = circle[0];
    for(let i = 0; i < 100; ++i) {

        let picked = circle.splice(circle.indexOf(currentCup)+1, 3);
        picked = picked.concat(circle.splice(0, 3-picked.length));

        let destinationCup = currentCup - 1;
        if(destinationCup === 0) destinationCup = 9;
        while(circle.indexOf(destinationCup) === -1) {
            destinationCup--;
            if(destinationCup === 0) destinationCup = 9;
        }

        circle.splice(circle.indexOf(destinationCup)+1, 0, ...picked);

        currentCup = circle[(circle.indexOf(currentCup)+1) % 9];
    }


    let after1 = circle.splice(circle.indexOf(1)+1);
    return after1.concat(circle.splice(0, 8-after1.length)).join("");
}



/**
 * the daily challenge, part 2.
 *
 * https://adventofcode.com/2020/day/23
 */
function part2(input) {

}