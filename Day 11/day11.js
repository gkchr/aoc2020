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
        .map(i => i.split(""));

    console.log("--- part 1 ---", part1(input));

    console.log("--- part 2 ---", part2(input));
});



/**
 * the daily challenge, part 1.
 *
 * https://adventofcode.com/2020/day/11
 */
function part1(input) {
    let output = step(input);
    while(output.changed > 0) {
        output = step(output.array);
    }
    let seats = output.array.reduce((count, row) => count + row.reduce((count, i) => count + (i === "#" ? 1 : 0), 0), 0);
    return seats;
}

function step(input) {
    let output = [];
    let changed = 0;

    for(let i = 0; i < input.length; ++i) {
        output[i] = [];
        for(let j = 0; j < input[i].length; ++j) {
            if(input[i][j] === ".") {
                output[i][j] = ".";
            } else {
                let neighbors =
                    (input[i-1] && input[i-1][j-1] && input[i-1][j-1] === "#" ? 1 : 0) +
                    (input[i-1] && input[i-1][j]   && input[i-1][j]   === "#" ? 1 : 0) +
                    (input[i-1] && input[i-1][j+1] && input[i-1][j+1] === "#" ? 1 : 0) +
                    (              input[i][j-1]   && input[i][j-1]   === "#" ? 1 : 0) +
                    (              input[i][j+1]   && input[i][j+1]   === "#" ? 1 : 0) +
                    (input[i+1] && input[i+1][j-1] && input[i+1][j-1] === "#" ? 1 : 0) +
                    (input[i+1] && input[i+1][j]   && input[i+1][j]   === "#" ? 1 : 0) +
                    (input[i+1] && input[i+1][j+1] && input[i+1][j+1] === "#" ? 1 : 0);

                if(input[i][j] === "#" && neighbors > 3) {
                    output[i][j] = "L";
                    changed ++;
                } else if(input[i][j] === "L" && neighbors === 0) {
                    output[i][j] = "#";
                    changed ++;
                } else {
                    output[i][j] = input[i][j];
                }
            }
        }
    }
    return {array: output, changed: changed};
}



/**
 * the daily challenge, part 2.
 *
 * https://adventofcode.com/2020/day/11
 */
function part2(input) {
    let output = step2(input);
    while(output.changed > 0) {
        output = step2(output.array);
    }
    let seats = output.array.reduce((count, row) => count + row.reduce((count, i) => count + (i === "#" ? 1 : 0), 0), 0);
    return seats;
}

function step2(input) {
    let output = [];
    let vis = [];
    let changed = 0;

    for(let i = 0; i < input.length; ++i) {
        output[i] = [];
        vis[i] = [];
        for(let j = 0; j < input[i].length; ++j) {
            if(input[i][j] === ".") {
                output[i][j] = ".";
                vis[i][j] = ". ";
            } else {
                let neighbors =
                    isOccupied(input, i, j, -1, -1) +
                    isOccupied(input, i, j, -1, 0 ) +
                    isOccupied(input, i, j, -1, 1 ) +
                    isOccupied(input, i, j, 0,  -1) +
                    isOccupied(input, i, j, 0,  1 ) +
                    isOccupied(input, i, j, 1,  -1) +
                    isOccupied(input, i, j, 1,  0 ) +
                    isOccupied(input, i, j, 1,  1 );

                if(input[i][j] === "#" && neighbors > 4) {
                    output[i][j] = "L";
                    changed ++;
                } else if(input[i][j] === "L" && neighbors === 0) {
                    output[i][j] = "#";
                    changed ++;
                } else {
                    output[i][j] = input[i][j];
                }
                vis[i][j] = input[i][j] + "" + neighbors;
            }
        }
    }
    return {array: output, changed: changed};
}

function isOccupied(arr, y, x, y_, x_) {
    for(let i = 1; ; ++i) {
        if(arr[y+y_*i] && arr[y+y_*i][x+x_*i]) {
            if(arr[y+y_*i][x+x_*i] === ".") continue;
            if(arr[y+y_*i][x+x_*i] === "#") return 1;
        }
        return 0;
    }
}