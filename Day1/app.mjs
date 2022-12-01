import { readFile } from 'fs';

const filename = "./data.txt";

readFile(filename, 'utf-8', function (err, data) {
    if (err) {
        return console.warn(`Could not read file because: ${err.message}`);
    }

    const spt = data.split("\n")
    let snacks = []
    let sum = 0

    for (const line of spt) {
        if (line != "\r") {
            sum += parseInt(line.replace("\r", ''))
        } else {
            snacks.push(sum)
            sum = 0
        }
    }

    snacks.sort((a, b) => b - a)

    let higher = snacks[0]
    let secondHigher = snacks[1]
    let thirdHigher = snacks[2]

    // console.log(snacks);
    console.log('1 : ' + higher);
    console.log('2 : ' + secondHigher);
    console.log('3 : ' + thirdHigher);

    console.log('Total of the all 3 : ' + (higher + secondHigher + thirdHigher));
});

