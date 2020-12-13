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

    console.log("--- part 1 ---", part1(input));

    console.log("--- part 2 ---", part2(input));
});



/**
 * the daily challenge, part 1.
 *
 * https://adventofcode.com/2020/day/13
 */
function part1(input) {
    let time = parseInt(input[0]);
    let buses = input[1].split(",").filter(Number).map(Number);

    let nextBus = Infinity;
    let nextBusId = 0;
    buses.forEach(bus => {
        if(bus - time % bus < nextBus) {
            nextBus = bus - time % bus;
            nextBusId = bus;
        }
    });

    return nextBus * nextBusId;
}



/**
 * the daily challenge, part 2.
 *
 * https://adventofcode.com/2020/day/13
 */
function part2(input) {
    let buses = input[1].split(",").map(Number).map((bus, i) => ({bus: bus, offset: i})).filter(bus => bus.bus).sort((a, b) => b.bus - a.bus);

    let wrong = true;
    let time = Infinity;
    for(let mul = 218818380743; wrong; ++mul) {
        time = buses[0].bus * mul - buses[0].offset;
        wrong = false;

        for(let i = 1; i < buses.length; ++i) {
            if((time + buses[i].offset) % buses[i].bus !== 0) wrong = true;
        }
    }

    console.log(buses, time)
    return time;
}