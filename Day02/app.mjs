import { readFile } from 'fs';

const filename = "./data.txt";

/**
 * A = Caillou      X = Caillou     -> 1
 * B = Papier       Y = Papier      -> 2
 * C = Ciseaux      Z = Ciseaux     -> 3
 * 
 * Win = 6
 * Draw = 3
 * Loss = 0
 * 
 */

const pointsPart1 = {
    'A X': 3 + 1, 
    'A Y': 6 + 2, 
    'A Z': 0 + 3, 
    'B X': 0 + 1, 
    'B Y': 3 + 2, 
    'B Z': 6 + 3, 
    'C X': 6 + 1, 
    'C Y': 0 + 2, 
    'C Z': 3 + 3, 
}

const pointsPart2 = {
    X: {
        points: 0,
        A: 3,
        B: 1,
        C: 2
    },
    Y: {
        points: 3,
        A: 1,
        B: 2,
        C: 3
    },
    Z: {
        points: 6,
        A: 2,
        B: 3,
        C: 1
    }
}

let totalPoints = 0

readFile(filename, 'utf-8', function (err, data) {
    if (err) {
        return console.warn(`Could not read file because: ${err.message}`);
    }

    const spt = data.split("\r\n")

    for (let game of spt) {
        // Part 1
        // totalPoints+=pointsPart1[game]

        // Part 2
        game = game.split(' ')
        totalPoints += pointsPart2[game[1]].points
        totalPoints += pointsPart2[game[1]][game[0]]
    }

    console.log(totalPoints);
});

