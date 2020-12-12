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
        .map(instruction => {
            let part = /(\w)(\d+)/.exec(instruction);
            return {ins: part[1], val: parseInt(part[2])};
        });

    console.log("--- part 1 ---", part1(input));

    console.log("--- part 2 ---", part2(input));
});



/**
 * the ship class to navigate with.
 */
class Ship {
    constructor(startX = 0, startY = 0) {
        this.x = startX;
        this.y = startY;
        this.deg = 0;
        this.rad = 0;
    }

    forward(much) {
        this.x += Math.cos(this.rad) * much;
        this.y += Math.sin(this.rad) * much;
    }

    turn(much) {
        this.deg = (this.deg + much + 360) % 360;
        this.rad = this.deg * (Math.PI / 180);
    }

    move(x, y) {
        this.x += x;
        this.y += y;
    }

    get position() {
        return {east: this.x, north: this.y, deg: this.deg};
    }

    get manhattanDistance() {
        return Math.round(Math.abs(this.x) + Math.abs(this.y));
    }
}



/**
 * the navigation function to handle the input for a given ship.
 */
function navigate(input, ship) {
    input.forEach(line => {
        switch (line.ins) {
            case "N":
                ship.move(0, line.val);
                break;
            case "S":
                ship.move(0, -line.val);
                break;
            case "E":
                ship.move(line.val, 0);
                break;
            case "W":
                ship.move(-line.val, 0);
                break;
            case "L":
                ship.turn(line.val);
                break;
            case "R":
                ship.turn(-line.val);
                break;
            case "F":
                ship.forward(line.val);
                break;
        }
    });
}



/**
 * the daily challenge, part 1.
 *
 * https://adventofcode.com/2020/day/12
 */
function part1(input) {
    let ship = new Ship();
    navigate(input, ship);
    return ship.manhattanDistance;
}



/**
 * the ship class extended to use the waypoints.
 */
class WaypointShip extends Ship {
    constructor(waypointX, waypointY, startX = 0, startY = 0) {
        super(startX, startY);
        this.waypointX = waypointX;
        this.waypointY = waypointY;
    }

    forward(much) {
        this.x += this.waypointX * much;
        this.y += this.waypointY * much;
    }

    turn(much) {
        let rad = much * (Math.PI / 180);
        let newWaypointX = this.waypointX * Math.cos(rad) - this.waypointY * Math.sin(rad);
        let newWaypointY = this.waypointY * Math.cos(rad) + this.waypointX * Math.sin(rad);
        this.waypointX = newWaypointX;
        this.waypointY = newWaypointY;
    }

    move(x, y) {
        this.waypointX += x;
        this.waypointY += y;
    }


}



/**
 * the daily challenge, part 2.
 *
 * https://adventofcode.com/2020/day/12
 */
function part2(input) {
    let ship = new WaypointShip(10, 1);
    navigate(input, ship);
    return ship.manhattanDistance;
}