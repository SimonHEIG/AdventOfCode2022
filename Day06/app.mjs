import { readFile } from 'fs';

const filename = "./data.txt";

readFile(filename, 'utf-8', function (err, data) {
    if (err) {
        return console.warn(`Could not read file because: ${err.message}`);
    }
    let markerSize = {
        packet: 4,
        message: 14
    }

    let marker = []

    for (let i = 0; i < markerSize.message - 1; i++) {
        marker.push(data[i])
    }

    for (let i = 3; i < data.length; i++) {
        marker.push(data[i])
        // console.log(marker);
        if (marker.length == new Set(marker).size) {
            console.log(i + 1);
            break
        }
        marker.shift()
    }

});