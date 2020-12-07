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

    let input = data.replace(/(\r\n|\n|\r)/gm,"\n").split("\n").filter(i => i);

    let theBags = {};

    input.forEach(bag => {
        // console.log(bag);
        bag = /(\w+ \w+) bags? contain (.*)/.exec(bag);

        let content = bag[2].matchAll(/(\d+) (\w+ \w+)/g);

        theBags[bag[1]] = new Bag(bag[1], content);
    });


    console.log("--- part 1 ---", part1(theBags));

    console.log("--- part 2 ---", part2(theBags));
});



/**
 * the data structure for the Bags.
 */
function Bag(name, bags = []) {
    this.name = name;
    this.bags = bags && Array.from(bags).map(b => {return {amount: b[1], name: b[2]}});
    this.visited = undefined;
}

Bag.prototype.contains = function (which, theBags) {
    if(this.visited === undefined) {
        if(!this.bags) {
            this.visited = false;
        } else if(this.bags.map(b => b.name).includes(which)) {
            this.visited = true;
        } else {
            this.visited = false;
            for(let next of this.bags) {
                if(theBags[next.name].contains(which, theBags)) this.visited = true;
            }
        }
    }

    return this.visited;
};



/**
 * the daily challenge, part 1.
 *
 * https://adventofcode.com/2020/day/7
 */
function part1(theBags) {
    let count = 0;

    console.log(theBags);
    for(let b in theBags) {
        count += theBags[b].contains("shiny gold", theBags);
    }
    console.log(theBags);

    return count;
}



/**
 * the daily challenge, part 2.
 *
 * https://adventofcode.com/2020/day/7
 */
function part2(theBags) {

}