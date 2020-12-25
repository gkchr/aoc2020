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
        .filter(i => i);


    let visited = part1(input);
    console.log("--- part 1 ---", visited.size);

    console.log("--- part 2 ---", part2(visited));
});



/**
 * the navigation function.
 */
function getNavigation(line) {
    line = line.split("");
    let instructions = [];

    while(line.length) {
        let char = line.shift();
        if(char === "e") instructions.push("e");
        else if(char === "w") instructions.push("w");
        else {
            instructions.push(char + line.shift());
        }
    }

    return instructions;
}



/**
 * the daily challenge, part 1.
 *
 * https://adventofcode.com/2020/day/24
 */
function part1(input) {
    let list = input.map(line => getNavigation(line));

    let visited = new Map();
    for(let instructions of list) {
        let tile = [0,0];
        for(let ins  of instructions) {
            switch (ins) {
                case "e":
                    tile[0]++;
                    break;
                case "se":
                    tile[1]--;
                    break;
                case "sw":
                    tile[0]--;
                    tile[1]--;
                    break;
                case "w":
                    tile[0]--;
                    break;
                case "nw":
                    tile[1]++;
                    break;
                case "ne":
                    tile[0]++;
                    tile[1]++;
                    break;
            }
        }
        tile = tile.join();
        if(!visited.delete(tile)) {
            visited.set(tile, true);
        }
    }

    return visited;
}



/**
 * the daily challenge, part 2.
 *
 * https://adventofcode.com/2020/day/24
 */
function part2(visited) {
    // to be continued...
}



/**
 * Helper function to remove a value from array.
 *
 * @source https://stackoverflow.com/questions/3954438/how-to-remove-item-from-array-by-value
 * @returns {Array}
 */
Array.prototype.remove = function() {
    let what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};