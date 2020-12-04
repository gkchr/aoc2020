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
    let input = data.replace(/(\r\n|\n|\r)/gm,"\n").split("\n\n").filter(i => i);

    input = input.map((i) => {return i.split(/\s+/)});

    let passports = input.map((passport) => {
        return passport
            .map((line) => { return line.split(":"); })
            .reduce((object, field) => {
                if(field[0] && field[1]) {
                    object[field[0]] = field[1];
                }
                return object;
            }, {});
    });

    console.log("--- part 1 ---");
    part1(passports);

    console.log("--- part 2 ---");
    part2(passports);
});



/**
 * the daily challenge, part 1.
 *
 * https://adventofcode.com/2020/day/4
 */
function part1(passports) {
    let count = 0;

    let required = [
        "byr", // (Birth Year),
        "iyr", // (Issue Year),
        "eyr", // (Expiration Year),
        "hgt", // (Height),
        "hcl", // (Hair Color),
        "ecl", // (Eye Color),
        "pid", // (Passport ID),
        // "cid", // (Country ID),
    ];

    passports.forEach((pass) => {
        let complete = true;
        required.map((key) => {
            if(!pass.hasOwnProperty(key)) complete = false;
        });
        count += complete;
    });

    console.log(count);
}



/**
 * the daily challenge, part 2.
 *
 * https://adventofcode.com/2020/day/4
 */
function part2(passports) {
    let count = 0;

    let eyeColors = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"];
    let check = {
        "byr": function(val) { // (Birth Year)
            return /^\d{4}$/.test(val) && val >= 1920 && val <= 2002;
        },
        "iyr": function(val) { // (Issue Year)
            return /^\d{4}$/.test(val) && val >= 2010 && val <= 2020;
        },
        "eyr": function(val) { // (Expiration Year)
            return /^\d{4}$/.test(val) && val >= 2020 && val <= 2030;
        },
        "hgt": function(val) { // (Height)
            let num;
            if(num = /^(\d+)cm$/.exec(val)) {
                return num[1] >= 150 && num[1] <= 193;
            }
            if(num = /^(\d+)in$/.exec(val)) {
                return num[1] >= 59 && num[1] <= 76;
            }
            return false;
        },
        "hcl": function(val) { // (Hair Color)
            return /^#[0-9a-f]{6}$/.test(val);
        },
        "ecl": function(val) { // (Eye Color)
            return eyeColors.includes(val);
        },
        "pid": function(val) { // (Passport ID)
            return /^\d{9}$/.test(val);
        },
        // "cid", // (Country ID)
    };

    passports.forEach((pass) => {
        let complete = true;
        Object.keys(check).forEach((key) => {
            if(!pass.hasOwnProperty(key) || !check[key](pass[key])) complete = false;
        });
        count += complete;
    });

    console.log(count);
}