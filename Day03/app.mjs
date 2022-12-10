import { readFile } from 'fs';

const filename = "./data.txt";

readFile(filename, 'utf-8', function (err, data) {
    if (err) {
        return console.warn(`Could not read file because: ${err.message}`);
    }

    const rucksacks = data.split("\r\n")
    // console.log(rucksacks);

    // PART 1
    let sum = 0
    for (const rucksack of rucksacks) {
        const comp1 = rucksack.slice(0, rucksack.length / 2)
        const comp2 = rucksack.slice(rucksack.length / 2, rucksack.length)

        for (let i = 0; i < comp1.length; i++) {
            if (comp2.includes(comp1[i])) {
                const unicode = comp1[i].charCodeAt(0)
                if (unicode >= 97 && unicode <= 122) {
                    sum += unicode - 96
                } else if (unicode >= 65 && unicode <= 90) {
                    sum += unicode - 38
                }
                break
            }
        }
    }
    console.log(`Part 1 : ${sum}`);
    
    sum = 0
    // PART 2
    for (let i = 0; i < rucksacks.length; i+=3) {
        const rs1 = rucksacks[i]
        const rs2 = rucksacks[i+1]
        const rs3 = rucksacks[i+2]
        
        for(let i = 0; i < rs1.length; i ++){
            if(rs2.includes(rs1[i]) && rs3.includes(rs1[i])){
                const unicode = rs1[i].charCodeAt(0)
                if (unicode >= 97 && unicode <= 122) {
                    sum += unicode - 96
                } else if (unicode >= 65 && unicode <= 90) {
                    sum += unicode - 38
                }
                break
            }
        }
    }
    console.log(`Part 2 : ${sum}`);

});

