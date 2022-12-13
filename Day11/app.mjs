import { readFile } from 'fs';

const filename = "./data.txt";

readFile(filename, 'utf-8', function (err, data) {
    if (err) {
        return console.warn(`Could not read file because: ${err.message}`);
    }

    let monkeys = getMonkeys(data)
    let monkeyBusinessLevel = []
    let rounds = 10000

    let supermodulo = 1
    for (const key of Object.keys(monkeys)) {
        supermodulo *= monkeys[key].test.divisibleBy
    }

    for (let round = 0; round < rounds; round++) {
        monkeyBusinessLevel = []

        for (const key of Object.keys(monkeys)) {

            for (let item of monkeys[key].items) {
                let worryLevel = item
                let operation = monkeys[key].operation[0]

                let by = 0
                if (monkeys[key].operation[1] == 'old') {
                    by = item
                } else {
                    by = monkeys[key].operation[1]
                }

                // Inspects
                switch (operation) {
                    case '+':
                        worryLevel += by
                        break
                    case '*':
                        worryLevel *= by
                        break
                }
                monkeys[key].inspectedItems++

                // Gets borred
                // part 1
                // worryLevel = Math.trunc(worryLevel /= 3)
                // part 2
                worryLevel = worryLevel % supermodulo

                // Tests & throws
                if (worryLevel % monkeys[key].test.divisibleBy == 0) {
                    monkeys[monkeys[key].test.true].items.push(worryLevel)
                } else {
                    monkeys[monkeys[key].test.false].items.push(worryLevel)
                }
            }
            monkeys[key].items = []
        }

        for (const key of Object.keys(monkeys)) {
            monkeyBusinessLevel.push(monkeys[key].inspectedItems)
        }

    }
    monkeyBusinessLevel = monkeyBusinessLevel.sort((a, b) => b - a)
    console.log(`Monkey business level : ${monkeyBusinessLevel[0] * monkeyBusinessLevel[1]}`);
});

function getMonkeys(data) {
    let monkeys = {}
    let name = ''

    for (const line of data.split("\r\n")) {
        if (line.split(' ')[0] == 'Monkey') {
            name = line.slice(0, -1).split(' ')[1]
            monkeys[name] = {}
            monkeys[name]['inspectedItems'] = 0
        } else {
            let expr = line.split(': ');
            expr[0] = expr[0].slice(2)
            switch (expr[0]) {
                case 'Starting items':
                    monkeys[name]['items'] = expr[1].split(', ').map(item => parseInt(item))
                    break
                case 'Operation':
                    monkeys[name]['operation'] = [expr[1].split(' ')[3], expr[1].split(' ')[4]]
                    if (monkeys[name]['operation'][1] != 'old') {
                        monkeys[name]['operation'][1] = parseInt(monkeys[name]['operation'][1])
                    }
                    break
                case 'Test':
                    monkeys[name]['test'] = {}
                    monkeys[name]['test']['divisibleBy'] = parseInt(expr[1].split(' ')[2])
                    break;
                case '  If true':
                    monkeys[name]['test']['true'] = expr[1].split(' ')[3]
                    break
                case '  If false':
                    monkeys[name]['test']['false'] = expr[1].split(' ')[3]
                    break
            }
        }

    }
    return monkeys
}
