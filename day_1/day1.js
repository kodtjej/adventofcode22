import {promises as fs} from 'fs';

const input = './day_1/input';

async function main() {

    const firstAnswer = await part1Answer();
    const secondAnswer = await part2Answer();

    console.log(firstAnswer);
    console.log(secondAnswer);

}

async function fetchElfsCalories(){
    const data = await fs.readFile(input, 'utf-8');
    const dat = data.split('\n\n').map(elfSnacks => elfSnacks.split('\n').reduce((acc, elfSnack) => acc + parseInt(elfSnack,10), 0)).sort((a,b) => b-a);
    console.log(dat)
    return dat
}

async function part1Answer() {
    const calories = await fetchElfsCalories();
    return calories[0];
}

async function part2Answer() {
    const calories = await fetchElfsCalories();
    return calories.slice(0,3).reduce((acc, elfCalories) => acc + elfCalories, 0);
}

main();