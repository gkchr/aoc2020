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
        .map(line => line.split(""))
        .filter(i => i);




    console.log("--- part 1 ---", part1(input));
});



/**
 * the iteration function.
 */
function iterate(game) {
    let newSpaces = new Map();
    let [xMin, xMax] = game.x;
    let [yMin, yMax] = game.y;
    let [zMin, zMax] = game.z;

    for(let z = game.z[0]-1; z <= game.z[1]+1; ++z) {
        for(let x = game.x[0]-1; x <= game.x[1]+1; ++x) {
            for(let y = game.y[0]-1; y <= game.y[1]+1; ++y) {
                let neighbors = lookup(game.spaces, x, y, z);
                let cube = game.spaces.get(z+","+x+","+y);
                if(cube && (neighbors === 2 || neighbors === 3)) {
                    newSpaces.set(z+","+x+","+y, true);
                }
                if(!cube && neighbors === 3) {
                    if(x < xMin) xMin = x;
                    if(y < yMin) yMin = y;
                    if(z < zMin) zMin = z;
                    if(x > xMax) xMax = x;
                    if(y > yMax) yMax = y;
                    if(z > zMax) zMax = z;
                    newSpaces.set(z+","+x+","+y, true);
                }
            }
        }
    }

    return {spaces: newSpaces, x: [xMin, xMax], y: [yMin, yMax], z: [zMin, zMax] };
}



/**
 * the lookup function.
 */
function lookup(spaces, xSpace, ySpace, zSpace) {
    let count = 0;
    for(let x = xSpace-1; x <=xSpace+1; ++x)
        for(let y = ySpace-1; y <=ySpace+1; ++y)
            for(let z = zSpace-1; z <=zSpace+1; ++z) {
                if(x === xSpace && y === ySpace && z === zSpace) continue;
                if(spaces.get(z+","+x+","+y) === true) count++;
            }
    return count;
}



/**
 * the daily challenge, part 1.
 *
 * https://adventofcode.com/2020/day/17
 */
function part1(input) {
    let spaces = new Map();
    input.forEach((line, x) => line.forEach((field, y) => spaces.set("0,"+x+","+y, field === "#")));

    let game = {spaces: spaces, x: [0, input.length-1], y: [0, input[0].length-1], z: [0, 0] };

    for(let i = 1; i <= 6; ++i) {
        game = iterate(game);
        console.log("after i"+i, game.spaces.size);
        // console.log(game.spaces);
    }

    console.log(game.spaces.size);
}



/**
 * the daily challenge, part 2.
 *
 * https://adventofcode.com/2020/day/17
 */
function part2(input) {

}