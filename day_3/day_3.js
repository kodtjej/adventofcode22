import {promises as fs} from 'fs';
import _ from 'underscore';

const input = './day_3/input';
const points_input = './day_3/points.json';

async function main() {
    const data = await fs.readFile(input, 'utf-8');
    const answerOne = await answerPart1(data);
    const answerTwo = await answerPart2(data);
    console.log(answerOne);
    console.log(answerTwo);
}

async function answerPart2(data) {
    let rucksacks = data.split('\n');
    let groups = _.chunk(rucksacks, 3);

    groups = groups.map(r => r.map(v => v.split(''))); //split strings into character arrays
    groups = groups.map(g => g.map(r => r.sort())); //sort the strings
    const badges = [];
    for (let i = 0; i < groups.length; i++) {
        let hasFoundGroup = false
        groups[i][0].map(item => {
            if (groups[i][1].includes(item) && groups[i][2].includes(item) && !hasFoundGroup) {
                badges.push(item);
                hasFoundGroup = true;
            }
        })
    }
    let points = await getPoints()

    return badges.map(b => points[b]).reduce((acc, val) => acc + val);
}

async function answerPart1(data) {
    let rows = data.split('\n').map(r => r.split(''));
    rows = rows.map(val => {
        const len = val.length / 2;
        return {
            firstPart: val.slice(0, len),
            secondPart: val.slice(len)
        }
    });
    let missplacedObjects = rows.map(rucksack => rucksack.firstPart.map(thing => rucksack.secondPart.indexOf(thing) > -1 ? thing : null))
        .map(t => t.filter((v, index) => t.indexOf(v) === index))
        .flatMap(t => t.filter(v => v !== null));

    let points = await getPoints()

    return missplacedObjects.map(m => points[m]).reduce((acc, val) => acc + val);
}

async function getPoints() {
    let points = await fs.readFile(points_input, 'utf-8');
    points = await JSON.parse(points);
    return points;
}

main();
