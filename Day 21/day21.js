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

    input = input.map(line => line.split(" (contains "));
    let ingredients = input.map(line => line[0].split(" "));
    let allergens = input.map(line => line[1].split(")")[0].split(", "));

    let list = {};
    let allIngredients = {};

    for(let i in ingredients) {
        for(let allergen of allergens[i]) {
            if(list.hasOwnProperty(allergen)) {
                let newList = [];
                for(let ingredient of ingredients[i]) {
                    if(list[allergen].includes(ingredient)) newList.push(ingredient);
                }
                list[allergen] = newList;
            } else {
                list[allergen] = ingredients[i];
            }
        }
        for(let ingredient of ingredients[i]) {
            allIngredients[ingredient] = allIngredients.hasOwnProperty(ingredient) ? allIngredients[ingredient]+1 : 1;
        }
    }
    list = Object.entries(list);
    for(let i = 0; i < list.length; ++i) {
        list.sort((a,b) => a[1].length - b[1].length);
        for(let j = i+1; j < list.length; ++j) {
            list[j][1] = list[j][1].filter(el => el !== list[i][1][0]);
        }
    }

    let allAllergens = list.map(a => a[1][0]);
    allIngredients = Object.entries(allIngredients);
    let saveIngredients = allIngredients.filter(ing => !allAllergens.includes(ing[0]));

    console.log("--- part 1 ---", saveIngredients.reduce((a,b) => a+b[1], 0));


    list.sort((a,b) => a[0].localeCompare(b[0]));

    console.log("--- part 2 ---", list.map(el => el[1][0]).join());
});