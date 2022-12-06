import {promises as fs} from 'fs';
import _ from 'underscore';

const input = './day_5/input';

async function main() {
    const data = await fs.readFile(input, 'utf-8');
    const answerOne = answerPart1(data);
    const answerTwo = answerPart2(data);

    console.log(answerOne);
    console.log(answerTwo);
}

function answerPart2(data) {
    const storage = parseStorage(data.split("\n\n")[0]);
    const movements = parseMovements(data.split("\n\n")[1]);

    movements.map(movement => {
        let tempArray = []
        for(let i=0; i<movement.numberOfBoxes; i++){
            tempArray.push(storage[movement.fromColumn].pop());

        }
        tempArray = _.chain(tempArray).reverse().value()
        storage[movement.toColumn].push(...tempArray)

    })

    return _.map(storage, (row) => _.last(row)).filter(v => v !== undefined);
}
function answerPart1(data) {
    const storage = parseStorage(data.split("\n\n")[0]);
    const movements = parseMovements(data.split("\n\n")[1]);

    movements.map(movement => {
        for(let i=0; i<movement.numberOfBoxes; i++){
                storage[movement.toColumn].push(storage[movement.fromColumn].pop());
        }
    })

    return _.map(storage, (row) => _.last(row)).filter(v => v !== undefined);
}

function parseMovements(data){
    return data.split(/\n/).map(r => {
        const digits = r.match(/\d+/gm);
        return {
            numberOfBoxes: parseInt(digits[0]),
            fromColumn: parseInt(digits[1]),
            toColumn: parseInt(digits[2])
        }
    });
}
function parseStorage(data){
    let numbers = data.match(/\d/gm).map(v => parseInt(v));
    let derp = _.initial(data.replaceAll(/\d/gm, '').split(/\n/))

    data = derp.flatMap(d => d.replaceAll('     ', ' [-] ').trim().split(/\n/));

    let boxes = _.chain(data).reverse().value();
    let warehouse = {};
    numbers.map(n => warehouse[n] = []);
    boxes.map(b => b.split(' ')).map(row => row.map((b, i) => {
        if (b !== '[-]' && b !== '') {
            warehouse[i + 1].push(b)

        }
    }
    ));
    return warehouse
}

main();