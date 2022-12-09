import { readFile } from 'fs';

const filename = "./data.txt";

readFile(filename, 'utf-8', function (err, data) {
    if (err) {
        return console.warn(`Could not read file because: ${err.message}`);
    }

    const logs = data.split("\r\n")

    // console.log(logs);

    let fileSystem = {
        '/': {
            total: 0
        }
    }

    let currentPath = []
    let listing = false
    let sum = 0

    for (const log of logs) {
        if (log.slice(0, 4) == '$ cd') {
            listing = false
            const direction = log.split(' ')[2]

            if (direction == '..') {
                const content = log.split(' ')

                let cursor = currentPath.toString()
                let currentDirectory = cursor.split(",").reduce(function (obj, prop) {
                    return obj && obj[prop];
                }, fileSystem);


                const total = currentDirectory.total
                if(total <= 100000){
                    sum += total
                }

                currentPath.pop()

                cursor = currentPath.toString()
                currentDirectory = cursor.split(",").reduce(function (obj, prop) {
                    return obj && obj[prop];
                }, fileSystem);

                currentDirectory.total += total

            } else {
                currentPath.push(direction)
            }

        } else if (log.slice(0, 4) == '$ ls') {
            listing = true
        }


        if (listing) {
            const content = log.split(' ')
            let cursor = currentPath.toString()

            let currentDirectory = cursor.split(",").reduce(function (obj, prop) {
                return obj && obj[prop];
            }, fileSystem);

            if (content[0] == "dir") {
                currentDirectory[content[1]] = {}
                currentDirectory[content[1]]['total'] = 0
            }else if(content[0] != "$"){
                currentDirectory[content[1]] = parseInt(content[0])
                currentDirectory.total += parseInt(content[0])
            }
        }
    }

    // console.log(fileSystem);
    console.log(JSON.stringify(fileSystem, null, 2));
    console.log(sum);

});