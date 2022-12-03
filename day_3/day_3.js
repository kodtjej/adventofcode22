import {promises as fs} from 'fs';

const input = './day_3/test_input';
const points_input = './day_3/points.json';
async function main(){
    const data = await fs.readFile(input, 'utf-8');
    const answerOne = await answerPart1(data);
    console.log(answerOne);
}

async function answerPart1(data){
    let rows = data.split('\n').map(r => r.split(''));
    rows = rows.map(val => {
        const len = val.length/2;
        return {
            firstPart:val.slice(0,len),
            secondPart: val.slice(len)
        }
    });
    let missplacedObjects = rows.map(rucksack => rucksack.firstPart.map(thing => rucksack.secondPart.indexOf(thing) > -1 ? thing : null))
    .map(t => t.filter((v, index) => t.indexOf(v) === index))
    .flatMap(t => t.filter(v => v !== null));

    let points = await getPoints()

    return missplacedObjects.map(m => points[m]).reduce((acc, val) => acc+val);
}

async function getPoints(){
    let points = await fs.readFile(points_input, 'utf-8');
    points = await JSON.parse(points);
    return points;
}

main();
