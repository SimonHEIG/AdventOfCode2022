import { readFile } from 'fs';

const filename = "./data.txt";

readFile(filename, 'utf-8', function (err, data) {
    if (err) {
        return console.warn(`Could not read file because: ${err.message}`);
    }

    const logs = data.split("\n")
    logs.push('$ cd ..')
    console.log(logs);

    let fileSystem = {
        '/': {
            total: 0
        }
    }

    let currentPath = []
    let listing = false
    let part1 = 0
    let potentialDelete = []

    for (const log of logs) {
        // console.log(log.slice(0, 4));
        if (log.slice(0, 4) == '$ cd') {
            listing = false
            const direction = log.split(' ')[2]

            if (direction == '..') {
                // Ajout du total du dossier à la somme
                let cursor = currentPath.toString()
                let currentDirectory = cursor.split(",").reduce(function (obj, prop) {
                    return obj && obj[prop];
                }, fileSystem);
                const total = currentDirectory.total
                if (total <= 100000) {
                    part1 += total
                } else if (total >= 3598596) {
                    potentialDelete.push(total)
                }

                // Remonter d'un niveau
                currentPath.pop()

                // Ajout de la total du dossier enfant au total du dossier parrent
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
            } else if (content[0] != "$") {
                currentDirectory[content[1]] = parseInt(content[0])
                currentDirectory.total += parseInt(content[0])
            }
        }
    }

    // console.log(fileSystem);
    // console.log(JSON.stringify(fileSystem, null, 4));
    // console.log(part1);

    let totalDiskSpace = 70000000               // 70 000 000
    let diskSpaceUsed = fileSystem['/'].total   // 43 598 596
    let diskSpaceNeeded = 30000000              // 30 000 000
    let spaceToClear = diskSpaceUsed + diskSpaceNeeded - totalDiskSpace // 3 598 596

    // console.log(potentialDelete);
    potentialDelete.sort((a, b) => a - b)

    console.log(potentialDelete[0]);
    // console.log(spaceToClear);

});