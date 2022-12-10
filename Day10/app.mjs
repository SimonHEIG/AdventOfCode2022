import { readFile } from 'fs';

const filename = "./data.txt";

readFile(filename, 'utf-8', function (err, data) {
    if (err) {
        return console.warn(`Could not read file because: ${err.message}`);
    }

    const breakpointsPart1 = [20, 60, 100, 140, 180, 220]
    const breakpointsPart2 = [40, 80, 120, 160, 200, 240]

    let line = ''

    // let x = 1    // Part 2
    let x = 2       // Part 3
    let cycle = 0
    let signalSum = 0

    const instructions = data.split("\r\n")

    let loops = 0

    for (const instruction of instructions) {
        if (instruction.split(' ')[0] == 'addx') {
            loops = 2
        } else if (instruction.split(' ')[0] == 'noop') {
            loops = 1
        }

        let secondeCycle = false

        for (let i = 0; i < loops; i++) {
            // begin
            cycle++

            // during
            // part 1
            // if (breakpointsPart1.includes(cycle)) {
            //     signalSum += cycle * x
            // }

            // part 2
            const sprite = [x - 1, x, x + 1]

            if (sprite.includes(cycle)) {
                line += '#'
            } else {
                line += '.'
            }
            if (breakpointsPart2.includes(cycle)) {
                console.log(line);
                cycle = 0
                line = ''
            }

            // finish
            if (loops == 2 && secondeCycle) {
                x += parseInt(instruction.split(' ')[1])
            } else if (loops == 2) {
                secondeCycle = true
            }
        }
    }
    console.log(`sum : ${signalSum}`);

});
