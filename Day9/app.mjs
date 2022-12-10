import { readFile } from 'fs';
import { relative } from 'path';

const filename = "./data.txt";


let ropeLength = 10
let x = {}
let y = {}
for (let i = 0; i < ropeLength; i++) {
    x[i] = 0
    y[i] = 0
}
let tailPostionHistory = []

readFile(filename, 'utf-8', function (err, data) {
    if (err) {
        return console.warn(`Could not read file because: ${err.message}`);
    }

    const actions = data.split("\n")

    for (const action of actions) {
        let move = action.split(' ')

        for (let i = 0; i < parseInt(move[1]); i++) {
            moveHead(move[0])
            moveBody()
        }
    }
    console.log(tailPostionHistory.length);
});

function moveHead(direction) {
    if (direction == 'U') {
        y[0]++
    } else if (direction == 'D') {
        y[0]--
    } else if (direction == 'R') {
        x[0]++
    } else if (direction == 'L') {
        x[0]--
    }
}

function moveBody() {
    for(let knot = 1; knot < ropeLength; knot++){
        const realtiveHead = {x: x[knot-1], y: y[knot-1]}
        const realtiveTail = {x: x[knot], y: y[knot]}

        if (realtiveHead.y - realtiveTail.y == 2) {
            y[knot]++
            diagonaleY(knot)
        } else if (realtiveHead.y - realtiveTail.y == -2) {
            y[knot]--
            diagonaleY(knot)
        } else if (realtiveHead.x - realtiveTail.x == 2) {
            x[knot]++
            diagonaleX(knot)
        } else if (realtiveHead.x - realtiveTail.x == -2) {
            x[knot]--
            diagonaleX(knot)
        }
        
        if(knot == ropeLength-1){
            if (!tailPostionHistory.includes(`${x[knot]}, ${y[knot]}`)) {
                tailPostionHistory.push(`${x[knot]}, ${y[knot]}`)
            }
        }
    }
}

function diagonaleX(knot) {
    const realtiveHead = {x: x[knot-1], y: y[knot-1]}
    const realtiveTail = {x: x[knot], y: y[knot]}

    if (realtiveHead.y > realtiveTail.y) {
        y[knot]++
    } else if (realtiveHead.y < realtiveTail.y) {
        y[knot]--
    }
}

function diagonaleY(knot) {
    const realtiveHead = {x: x[knot-1], y: y[knot-1]}
    const realtiveTail = {x: x[knot], y: y[knot]}

    if (realtiveHead.x > realtiveTail.x) {
        x[knot]++
    } else if (realtiveHead.x < realtiveTail.x) {
        x[knot]--
    }
}
