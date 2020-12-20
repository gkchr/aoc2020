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
    let tileMap = tiles.reduce((map, tile) => map.set(tile.id, tile), new Map());

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

    let singleBorders = Object.values(borders).filter(b => b.length === 1);
    let corners = {};
    singleBorders.forEach(entry => {
        corners[entry[0].id] = corners.hasOwnProperty(entry[0].id) ? corners[entry[0].id]+1 : 1;
    });
    corners = Object.entries(corners).filter(c => c[1] === 4).map(c => parseInt(c[0]));


    console.log("--- part 1 ---", part1(corners));

    console.log("--- part 2 ---", part2(tileMap, borders, corners));
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

        this.core = lines.map(line => line.slice(1, line.length-1));
        this.core.shift();
        this.core.pop();
    }

    get borders() {
        return [this.top, this.bottom, this.left, this.right];
    }

    alignTop(topBorder) {
        let flip = false;
        if(!this.borders.includes(topBorder)) {
            topBorder = topBorder.split("").reverse().join("");
            flip = true;
        }
        while(this.top !== topBorder) this.rotate();
        if(flip) this.flip();
        return this;
    }

    rotate() {
        let temp = this.top;
        this.top = this.right;
        this.right = this.bottom;
        this.bottom = this.left;
        this.left = temp;

        let newCore = [];
        for(let i = 0; i < this.core.length; ++i) {
            newCore[i] = [];
            for(let j = 0; j < this.core.length; ++j) {
                newCore[i][j] = this.core[j][i];
            }
            newCore[i] = newCore[i].join("");
        }
        this.core = newCore;

        return this;
    }

    flip() {
        this.top = this.top.split("").reverse().join("");
        this.bottom = this.bottom.split("").reverse().join("");
        let temp = this.right;
        this.right = this.left;
        this.left = temp;
        this.core = this.core.map(line => line.split("").reverse().join(""));
    }

    upSideDown() {
        let temp = this.top;
        this.top = this.bottom;
        this.bottom = temp;
        this.left = this.left.split("").reverse().join("");
        this.right = this.right.split("").reverse().join("");
        this.core = this.core.reverse();
        return this;
    }
}



/**
 * the Field class.
 */
class Field {
    constructor(field) {
        this.field = field.map(line => line.split("").map(item => item === "#" ? 1 : 0));
        // console.log(this.field);
    }

      //                   #
      // #    ##    ##    ###
      //  #  #  #  #  #  #

    snake(r, c) {
        return 15 ===
            (this.field[r + 0][c + 18] +
            this.field[r + 1][c + 0] +
            this.field[r + 1][c + 5] +
            this.field[r + 1][c + 6] +
            this.field[r + 1][c + 11] +
            this.field[r + 1][c + 12] +
            this.field[r + 1][c + 17] +
            this.field[r + 1][c + 18] +
            this.field[r + 1][c + 19] +
            this.field[r + 2][c + 1] +
            this.field[r + 2][c + 4] +
            this.field[r + 2][c + 7] +
            this.field[r + 2][c + 10] +
            this.field[r + 2][c + 13] +
            this.field[r + 2][c + 16]);
    }

    snakeLog(r, c) {
        console.log(
            this.field[r + 0][c + 18], r + 0, c + 18, "\n",
            this.field[r + 1][c + 0] , r + 1, c + 0 , "\n",
            this.field[r + 1][c + 5] , r + 1, c + 5 , "\n",
            this.field[r + 1][c + 6] , r + 1, c + 6 , "\n",
            this.field[r + 1][c + 11], r + 1, c + 11, "\n",
            this.field[r + 1][c + 12], r + 1, c + 12, "\n",
            this.field[r + 1][c + 17], r + 1, c + 17, "\n",
            this.field[r + 1][c + 18], r + 1, c + 18, "\n",
            this.field[r + 1][c + 19], r + 1, c + 19, "\n",
            this.field[r + 2][c + 1] , r + 2, c + 1 , "\n",
            this.field[r + 2][c + 4] , r + 2, c + 4 , "\n",
            this.field[r + 2][c + 7] , r + 2, c + 7 , "\n",
            this.field[r + 2][c + 10], r + 2, c + 10, "\n",
            this.field[r + 2][c + 13], r + 2, c + 13, "\n",
            this.field[r + 2][c + 16], r + 2, c + 16, "\n"
        );
    }

    snakeWrite(r, c) {
        this.field[r + 0][c + 18] += 5;
        this.field[r + 1][c + 0]  += 5;
        this.field[r + 1][c + 5]  += 5;
        this.field[r + 1][c + 6]  += 5;
        this.field[r + 1][c + 11] += 5;
        this.field[r + 1][c + 12] += 5;
        this.field[r + 1][c + 17] += 5;
        this.field[r + 1][c + 18] += 5;
        this.field[r + 1][c + 19] += 5;
        this.field[r + 2][c + 1]  += 5;
        this.field[r + 2][c + 4]  += 5;
        this.field[r + 2][c + 7]  += 5;
        this.field[r + 2][c + 10] += 5;
        this.field[r + 2][c + 13] += 5;
        this.field[r + 2][c + 16] += 5;
    }

    transpose() {
        let newField = [];
        for(let i = 0; i < this.field.length; ++i) {
            newField[i] = [];
            for(let j = 0; j < this.field.length; ++j) {
                newField[i][j] = this.field[j][i];
            }
        }
        this.field = newField;
    }

    flip() {
        this.field = this.field.reverse();
    }

    otherFlip() {
        this.field = this.field.map(x => x.reverse());
    }

    search() {
        let count = 0;
        for(let i = 0; i < this.field.length - 18; ++i) {
            for(let j = 0; j < this.field.length - 3; ++j) {
                count += this.snake(j, i);
            }
        }
        return count;
    }
}



/**
 * the daily challenge, part 1.
 *
 * https://adventofcode.com/2020/day/20
 */
function part1(corners) {
    return corners.reduce((a,b) => a*b, 1);
}



/**
 * the daily challenge, part 2.
 *
 * https://adventofcode.com/2020/day/20
 */
function part2(tileMap, borders, corners) {
    corners = corners.map(c => c+""); // need strings for matching tiles
    let firstCorner = tileMap.get(corners[1]);

    let firstBorder;
    for(let b of firstCorner.borders) {
        if(borders[b].length === 2) firstBorder = b;
    }

    firstCorner.alignTop(firstBorder).rotate().rotate();

    let firstRow = [firstCorner];
    while(true) {
        let thisBorder = borders[firstBorder];

        let nextTile = thisBorder.filter(b => b.id !== firstCorner.id);
        if(!nextTile.length) break;
        nextTile = tileMap.get(nextTile[0].id).alignTop(firstBorder);

        firstRow.push(nextTile);

        firstCorner = nextTile;
        firstBorder = nextTile.bottom;
    }


    // align the row to be on top
    firstRow.forEach(el => el.rotate());
    if(borders[firstRow[0].bottom].length === 1) {
        firstRow.forEach(el => el.upSideDown());
    }


    let field = [];
    for(let firstRowTile of firstRow) {
        let column = [firstRowTile];

        let tile = firstRowTile;
        let bottom = tile.bottom;

        while(true) {
            let thisBorder = borders[bottom];

            let nextTile = thisBorder.filter(b => b.id !== tile.id);
            if(!nextTile.length) break;
            nextTile = tileMap.get(nextTile[0].id).alignTop(bottom);

            column.push(nextTile);

            tile = nextTile;
            bottom = nextTile.bottom;
        }

        field.push(column);
    }


    let finalField = []
    let offset = field[0][0].core.length;
    for(let column in field) {
        for(let row in field[column]) {
            if(column === "0") {
                // console.log(field[column][row]);
                for(let line in field[column][row].core) {
                    // console.log(field[column][row].core[line]);
                    finalField[row*offset + 1*line] = field[column][row].core[line];
                }
            } else {
                for(let line in field[column][row].core) {
                    finalField[row*offset + 1*line] += field[column][row].core[line];
                }
            }
        }
    }


    console.log(finalField);

    let f = new Field(finalField);

    console.log(f.search());
    f.transpose();
    console.log(f.search());
    console.log(f.field.map(r => r.join("")));
    console.log(f.snakeWrite(2,2));
    console.log(f.field.map(r => r.join("")));
}