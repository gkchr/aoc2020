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
        .split("\n\n")
        .filter(i => i);


    let tiles = input.map(input => new Tile(input));

    let borders = {};
    tiles.forEach(tile => {
        tile.borders.forEach(border => {
            if(borders.hasOwnProperty(border)) borders[border].push({id: tile.id, rev: false});
            else borders[border] = [{id: tile.id, rev: false}];

            let reversed = border.split("").reverse().join("");
            if(borders.hasOwnProperty(reversed)) borders[reversed].push({id: tile.id, rev: true});
            else borders[reversed] = [{id: tile.id, rev: true}];
        });
    });


    console.log("--- part 1 ---", part1(borders));

    console.log("--- part 2 ---", part2(borders));
});



/**
 * the Tile class.
 */
class Tile {
    constructor(input) {
        let [name, ...lines] = input.split("\n");

        this.id = name.substr(5, 4);

        this.top = lines[0];
        this.bottom = lines[9];
        this.left = lines.map(line => line[0]).join("");
        this.right = lines.map(line => line[9]).join("");
    }

    get borders() {
        return [this.top, this.bottom, this.left, this.right];
    }
}



/**
 * the daily challenge, part 1.
 *
 * https://adventofcode.com/2020/day/20
 */
function part1(borders) {
    let singleBorders = Object.values(borders).filter(b => b.length === 1);

    let counts = {};
    singleBorders.forEach(entry => {
        counts[entry[0].id] = counts.hasOwnProperty(entry[0].id) ? counts[entry[0].id]+1 : 1;
    });

    let result = Object.entries(counts).filter(c => c[1] === 4).map(c => parseInt(c[0]));

    return result.reduce((a,b) => a*b, 1);
}



/**
 * the daily challenge, part 2.
 *
 * https://adventofcode.com/2020/day/20
 */
function part2(input) {

}