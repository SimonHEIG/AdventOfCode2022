import { readFile } from 'fs';

const filename = "./data.txt";

/**
 * INPUTS
 * 
 *     [G]         [P]         [M]    
 *     [V]     [M] [W] [S]     [Q]    
 *     [N]     [N] [G] [H]     [T] [F]
 *     [J]     [W] [V] [Q] [W] [F] [P]
 * [C] [H]     [T] [T] [G] [B] [Z] [B]
 * [S] [W] [S] [L] [F] [B] [P] [C] [H]
 * [G] [M] [Q] [S] [Z] [T] [J] [D] [S]
 * [B] [T] [M] [B] [J] [C] [T] [G] [N]
 *  1   2   3   4   5   6   7   8   9 
 * 
 **/

let stacks = [
    ['B', 'G', 'S', 'C'],
    ['T', 'M', 'W', 'H', 'J', 'N', 'V', 'G'],
    ['M', 'Q', 'S'],
    ['B', 'S', 'L', 'T', 'W', 'N', 'M'],
    ['J', 'Z', 'F', 'T', 'V', 'G', 'W', 'P'],
    ['C', 'T', 'B', 'G', 'Q', 'H', 'S'],
    ['T', 'J', 'P', 'B', 'W'],
    ['G', 'D', 'C', 'Z', 'F', 'T', 'Q', 'M'],
    ['N', 'S', 'H', 'B', 'P', 'F'],
]


readFile(filename, 'utf-8', function (err, data) {
    if (err) {
        return console.warn(`Could not read file because: ${err.message}`);
    }

    let actions = data.split("\r\n")
    // console.log(actions);

    for (const action of actions) {
        const spt = action.split(' ')
        const nbCrates = parseInt(spt[1])
        let from = stacks[parseInt(spt[3]) - 1]
        let to = stacks[parseInt(spt[5]) - 1]

        // PART 1
        // for (let i = 0; i < nbCrates; i++){
        //     to.push(from.pop())
        // }

        // PART 2
        to.push(...from.slice(from.length-nbCrates, from.length))
        from.splice(from.length-nbCrates, from.length)
    }
    
    let topStacks = ''
    for (const stack of stacks) {
        topStacks += stack[stack.length-1]
    }
    console.log(topStacks);
});

