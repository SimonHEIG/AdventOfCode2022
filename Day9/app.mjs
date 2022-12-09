import { readFile } from 'fs';

const filename = "./data.txt";

let headX = 0
let headY = 0
let tailX = 0
let tailY = 0
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
            moveTail()
        }
    }

    console.log(tailPostionHistory.length);
});

function moveTail() {
    if (headY - tailY == 2) {
        tailY++
        diagonaleY()
    } else if (headY - tailY == -2) {
        tailY--
        diagonaleY()
    } else if (headX - tailX == 2) {
        tailX++
        diagonaleX()
    } else if (headX - tailX == -2) {
        tailX--
        diagonaleX()
    }
    
    if(!tailPostionHistory.includes(`${tailX}, ${tailY}`)){
        tailPostionHistory.push(`${tailX}, ${tailY}`)
    }
}

function diagonaleX() {
    if (headY > tailY) {
        tailY++
    } else if (headY < tailY) {
        tailY--
    }
}
function diagonaleY() {
    if (headX > tailX) {
        tailX++
    } else if (headX < tailX) {
        tailX--
    }
}

function moveHead(direction) {
    if (direction == 'U') {
        headY++
    } else if (direction == 'D') {
        headY--
    } else if (direction == 'R') {
        headX++
    } else if (direction == 'L') {
        headX--
    }
}
