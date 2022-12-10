import { readFile } from 'fs';

const filename = "./data.txt";

readFile(filename, 'utf-8', function (err, data) {
    if (err) {
        return console.warn(`Could not read file because: ${err.message}`);
    }
    let sum = 0
    
    let pairs = data.split("\r\n").map(p => {
        let elve = p.split(',').map(e => {
            return { start: parseInt(e.split('-')[0]), end: parseInt(e.split('-')[1]) }
        })
        // console.log(elve);

        // PART 1
        // if ((elve[0].start <= elve[1].start && elve[0].end >= elve[1].end) ||
        //     (elve[1].start <= elve[0].start && elve[1].end >= elve[0].end)) {
        //     console.log(elve);
        //     sum++
        // }

        // PART 2
        if ((elve[1].start >= elve[0].start && elve[1].start <= elve[0].end) ||
            (elve[0].start >= elve[1].start && elve[0].start <= elve[1].end)) {
            console.log(elve);
            sum++
        }


        return elve
    })

    console.log(sum);

});

