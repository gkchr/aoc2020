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
        .map(line => line.split("\n"))
        .filter(i => i);

    let rules = input[0]
        .map(i => {
            let parts = /([\w\s]*): (\d+)-(\d+) or (\d+)-(\d+)/.exec(i);
            return {
                rule: parts[1],
                fromA: parseInt(parts[2]),
                toA: parseInt(parts[3]),
                fromB: parseInt(parts[4]),
                toB: parseInt(parts[5])
            };
        });

    let myTicket = input[1][1].split(",").filter(Number).map(Number);

    let nearbyTickets = input[2];
    nearbyTickets.shift();
    nearbyTickets = nearbyTickets.map(t => t.split(",").filter(Number).map(Number));

    let validTickets = part1(rules, nearbyTickets);
    console.log("--- part 1 ---", validTickets.err);

    let value = part2(rules, validTickets.valid, myTicket);
    console.log("--- part 2 ---", value);
});



/**
 * the daily challenge, part 1.
 *
 * https://adventofcode.com/2020/day/16
 */
function part1(rules, nearbyTickets) {
    let scanningError = 0;
    let validTickets = [];
    nearbyTickets.forEach(
        ticket => {
            let validTicket = true;
            ticket.forEach(value => {
                let valid = false;
                rules.forEach(rule => {
                    if((value >= rule.fromA && value <= rule.toA) || (value >= rule.fromB && value <= rule.toB)) {
                        valid = true;
                    }
                });
                if(!valid) {
                    scanningError += value;
                    validTicket = false;
                }
            })
            if(validTicket) validTickets.push(ticket);
        }
    );

    return {err: scanningError, valid: validTickets};
}



/**
 * the daily challenge, part 2.
 *
 * https://adventofcode.com/2020/day/16
 */
function part2(rules, validTickets, myTicket) {
    let mapping = {};

    // initialize, all is possible.
    validTickets[0].forEach((t, i) => {
        mapping[i] = rules.map(r => r.rule);
    });

    // work out the valid values.
    validTickets.forEach(ticket => {
        ticket.forEach((field, i) => {
            rules.forEach(rule => {
                if(mapping[i].includes(rule.rule)) {
                    if(!((field >= rule.fromA && field <= rule.toA) || (field >= rule.fromB && field <= rule.toB))) {
                        mapping[i].remove(rule.rule);
                    }
                }
            });
        })
    });

    // work out the mapping from the possibilities.
    let finalMapping = Object.entries(mapping);
    for(let i = 0; i < rules.length; ++i) {
        finalMapping.sort((a,b) => a[1].length - b[1].length);

        if(finalMapping[i][1].length > 1) console.error(finalMapping, "mapping not unambiguous");
        else {
            for(let j = i+1; j < rules.length; ++j) {
                finalMapping[j][1] = finalMapping[j][1].remove(finalMapping[i][1][0]);
            }
        }
    }

    // generate a mapping object.
    let mappingObj = {};
    finalMapping.forEach(mapping => mappingObj[mapping[1][0]] = parseInt(mapping[0]));

    // calculate the required fields.
    let value = 1;
    for(let [rule, pos] of Object.entries(mappingObj)) {
        if(rule.startsWith("departure")) {
            value *= myTicket[pos];
        }
    }
    return value;
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