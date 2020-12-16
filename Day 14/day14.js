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
        .map(i => i.split(/\s+=\s+/))
        .map(i => ({ins: i[0], val: i[1]}));

    console.log("--- part 1 ---", part1(input));

    console.log("--- part 2 ---", part2(input));
});



/**
 * helper function to replace position in string.
 */
String.prototype.replaceAt = function(index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
};



/**
 * helper function to calculate floating-permutations recursively.
 */
String.prototype.xPermutate = function() {
    let index = this.indexOf("X");
    if(index === -1) {
        return this;
    }
    else {
        return [
            this.replaceAt(index, "0").xPermutate(),
            this.replaceAt(index, "1").xPermutate()
        ].flat();
    }
};



/**
 * the daily challenge, part 1.
 *
 * https://adventofcode.com/2020/day/14
 */
function part1(input) {
    let mask;
    let mem = {};
    let pos;

    input.forEach(line => {
        if(line.ins === "mask") {
            mask = line.val;
        }
        else if(pos = /mem\[(\d+)]/.exec(line.ins)) {
            let bin = (line.val >>> 0).toString(2).padStart(36, "0");
            for(let i = 0; i < bin.length; ++i) {
                if(mask.charAt(i) !== "X") bin = bin.replaceAt(i, mask.charAt(i));
            }
            mem[pos[1]] = parseInt(bin, 2);
        }
    });

    return Object.values(mem).reduce((a, b) => a + b);
}



/**
 * the daily challenge, part 2.
 *
 * https://adventofcode.com/2020/day/14
 */
function part2(input) {
    let mask;
    let mem = {};
    let pos;

    input.forEach(line => {
        if(line.ins === "mask") {
            mask = line.val;
        }
        else if(pos = /mem\[(\d+)]/.exec(line.ins)) {
            let bin = (pos[1] >>> 0).toString(2).padStart(36, "0");
            for(let i = 0; i < bin.length; ++i) {
                if(mask.charAt(i) === "1") bin = bin.replaceAt(i, "1");
                if(mask.charAt(i) === "X") bin = bin.replaceAt(i, "X");
            }
            let addresses = bin.xPermutate();
            addresses.forEach(adr => mem[adr] = line.val);
        }
    });

    return Object.values(mem).reduce((a, b) => a*1 + b*1);
}