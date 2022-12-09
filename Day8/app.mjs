import { readFile } from 'fs';

const filename = "./data.txt";

readFile(filename, 'utf-8', function (err, data) {
    if (err) {
        return console.warn(`Could not read file because: ${err.message}`);
    }

    const forest = data.split("\n")
    let visibleTrees = 0
    let highestScenicScore = 0

    for (let line = 0; line < forest.length; line++) {
        for (let col = 0; col < forest[line].length; col++) {
            if (checkVisibility(forest, line, col)) {
                visibleTrees++
            }
            if(getScenicScore(forest, line, col) > highestScenicScore) {
                highestScenicScore = getScenicScore(forest, line, col)
            }
        }
    }

    console.log(`Visible trees : ${visibleTrees}`);
    console.log(`Highest scenic score : ${highestScenicScore}`);

});

function getScenicScore(forest, line, col) {

    // Sides
    if (line == 0 || col == 0 || line == forest.length - 1 || col == forest[0].length - 1) {
        return true
    }

    let height = forest[line][col]
    let up = 0
    let down = 0
    let left = 0
    let right = 0

    // Check haut
    for (let i = line - 1; i >= 0; i--) {
        if (forest[i][col] >= height) {
            up ++
            break
        }
        up ++
    }

    // Check bas
    for (let i = line + 1; i < forest.length; i++) {
        if (forest[i][col] >= height) {
            down ++
            break
        }
        down++
    }

    // Check gauche
    for (let i = col - 1; i >= 0; i--) {
        if (forest[line][i] >= height) {
            left ++
            break
        }
        left ++
    }

    // Check droit
    for (let i = col + 1; i < forest[line].length; i++) {
        if (forest[line][i] >= height) {
            right ++
            break
        }
        right ++
    }

    
    return up * down * left * right
}

function checkVisibility(forest, line, col) {

    // Sides
    if (line == 0 || col == 0 || line == forest.length - 1 || col == forest[0].length - 1) {
        return true
    }

    let visible = false
    let height = forest[line][col]

    // Check haut
    for (let i = line - 1; i >= 0; i--) {
        if (forest[i][col] >= height) {
            visible = false
            break
        }
        visible = true
    }
    if(visible){
        return true
    }

    // Check bas
    for (let i = line + 1; i < forest.length; i++) {
        if (forest[i][col] >= height) {
            visible = false
            break
        }
        visible = true
    }
    if(visible){
        return true
    }

    // Check gauche
    for (let i = col - 1; i >= 0; i--) {
        if (forest[line][i] >= height) {
            visible = false
            break
        }
        visible = true
    }
    if(visible){
        return true
    }

    // Check droit
    for (let i = col + 1; i < forest[line].length; i++) {
        if (forest[line][i] >= height) {
            visible = false
            break
        }
        visible = true
    }
    if(visible){
        return true
    }

    return visible
}