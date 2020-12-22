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


    console.log("--- part 1 ---", part1(input));

    console.log("--- part 2 ---", part2(input));
});



/**
 * the daily challenge, part 1.
 *
 * https://adventofcode.com/2020/day/22
 */
function part1(input) {
    input = input.map(i => i.split("\n").filter(i => i).map(Number));
    input.map(i => i.shift());

    while(input[0].length && input[1].length) {
        let a = input[0].shift();
        let b = input[1].shift();
        if(a > b) input[0] = input[0].concat([a, b]);
        else input[1] = input[1].concat([b, a]);
    }

    let winner = input[0].concat(...input[1]).reverse();
    let score = 0;
    let mul = 1;
    for(let card of winner) {
        score += mul++ * card;
    }

    return score;
}



/**
 * the daily challenge, part 2.
 *
 * https://adventofcode.com/2020/day/22
 */
function part2(input) {
    input = input.map(i => i.split("\n").filter(i => i).map(Number));
    input.map(i => i.shift());

    let result = recursive(input[0], input[1]);

    let score = 0;
    let mul = 1;
    let finalDeck = result.deck.reverse();
    for(let card of finalDeck) {
        score += mul++ * card;
    }
    return score;
}



/**
 * the recursive combat game.
 */
function recursive(player1, player2) {
    let history = new Map();
    while(true) {
        // if this causes a player to have all of the cards, they win.
        if(player2.length === 0) return {winner: 1, deck: player1};
        if(player1.length === 0) return {winner: 2, deck: player2};

        // same cards: player 1 wins.
        let state = player1.join(",")+"-"+player2.join(",");
        if(history.get(state) === true) return {winner: 1, deck: player1};
        history.set(state, true);

        // otherwise:
        let card1 = player1.shift();
        let card2 = player2.shift();

        // at least as many cards remaining in their deck as the value of the card: play recursive
        if(player1.length >= card1 && player2.length >= card2) {
            let game = recursive(player1.slice(0,card1), player2.slice(0,card2));
            if(game.winner === 1) player1 = player1.concat([card1, card2]);
            else player2 = player2.concat([card2, card1]);
        } else { // otherwise:
            if(card1 > card2) player1 = player1.concat([card1, card2]);
            if(card2 > card1) player2 = player2.concat([card2, card1]);
        }
    }
}