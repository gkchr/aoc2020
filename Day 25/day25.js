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
        .map(Number);


    let codes = input.map(i => ({publicKey: i}));
    codes.forEach(code => code.loopSize = getLoopSize(code.publicKey));

    let part1 = transform(codes[0].publicKey, codes[1].loopSize);

    console.log("--- part 1 ---", part1);
});



/**
 * the function to get the loop size.
 */
function getLoopSize(publicKey) {
    const subjectNumber = 7;
    let value = 1;
    let loopSize = 0;
    while(value !== publicKey) {
        value *= subjectNumber;
        value %= 20201227;
        loopSize++;
    }
    return loopSize;
}



/**
 * the function to transform the number for n loops.
 */
function transform(subjectNumber, loops) {
    let value = 1;
    while(loops--) {
        value *= subjectNumber;
        value %= 20201227;
    }
    return value;
}