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

    // let test = tiles[0];
    // console.log(test);
    // console.log(test.flip());
    // return;

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
        let flipped = topBorder.split("").reverse().join("");
        for(let i = 0; i < 4; ++i) {
            if(this.top === topBorder) return this;
            if(this.top === flipped) return this.flip();
            this.rotate();
        }
        return null;
    }

    alignLeft(leftBorder) {
        let flipped = leftBorder.split("").reverse().join("");
        for(let i = 0; i < 4; ++i) {
            if(this.left === leftBorder) return this;
            if(this.left === flipped) return this.upSideDown();
            this.rotate();
        }
        return null;
    }

    rotate() {
        let temp = this.top;
        this.top = this.right;
        this.right = this.bottom.split("").reverse().join("");
        this.bottom = this.left.split("").reverse().join("");
        this.left = temp;

        let newCore = [];
        for(let i = 0; i < this.core.length; ++i) {
            newCore[i] = [];
            for(let j = 0; j < this.core.length; ++j) {
                newCore[i][j] = this.core[j][i];
            }
            newCore[i] = newCore[i].join("");
        }
        this.core = newCore.map(line => line.split("").reverse().join(""));

        return this;
    }

    flip() {
        this.top = this.top.split("").reverse().join("");
        this.bottom = this.bottom.split("").reverse().join("");
        let temp = this.right;
        this.right = this.left;
        this.left = temp;
        this.core = this.core.map(line => line.split("").reverse().join(""));
        return this;
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
        if(borders[b].length === 2) {
            firstBorder = b;
            break;
        }
    }

    firstCorner.alignTop(firstBorder).rotate().rotate().flip();

    // find the first column on the left.
    let leftColumn = [firstCorner];
    while(true) {
        let thisBorder = borders[firstBorder];

        let nextTile = thisBorder.filter(b => b.id !== firstCorner.id);
        if(!nextTile.length) break;
        nextTile = tileMap.get(nextTile[0].id).alignTop(firstBorder);

        leftColumn.push(nextTile);

        firstCorner = nextTile;
        firstBorder = nextTile.bottom;
    }

    let field = [];
    for(let firstTileLeft of leftColumn) {
        let row = [firstTileLeft];
        field.push(row);
    }

    // extend the field from left to right.
    for(let row of field) {
        let tile = row[0];

        console.log(tile);

        while(true) {
            let rightEdge = tile.right;
            let thisBorder = borders[rightEdge];

            let nextTile = thisBorder.filter(b => b.id !== tile.id);
            if(!nextTile.length) break;
            nextTile = tileMap.get(nextTile[0].id).alignLeft(rightEdge);

            row.push(nextTile);

            tile = nextTile;

            console.log("nextTile", tile);
        }

    }

    console.log(field.map(f => f.map(ff => ff.id)));
    console.log(field.map(f => f.map(ff => ff.id + " : l" + ff.left + " r" + ff.right)));


    let stringField = "";
    for(let tileRow of field) {
        for(let line in tileRow[0].core) {
            for(let column of tileRow) {
                stringField += column.core[line];
            }
            stringField += "\n";
        }
    }
    console.log(stringField)

}