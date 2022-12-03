import {promises as fs} from 'fs';

const input = './day_2/input';

async function main() {
    let data = await fs.readFile(input, 'utf-8');
    const answer1 = part1Solution(data);
    const answer2 = part2Solution(data);


    console.log(answer1);
    console.log(answer2);

}

function part2Solution(data) {
    data = data.replaceAll(/(A)/img, 'R');
    data = data.replaceAll(/(B)/img, 'P');
    data = data.replaceAll(/(C)/img, 'S');

    data = data.split('\n').map(row => row.split(' '))
    data = data.map(row => {
        let myAnswer = '';
        switch (row[1]) {
            case 'Y':
                myAnswer = row[0];
                break;
            case 'X':
                myAnswer = getLosingAnswer(row[0]);
                break;
            case 'Z':
                myAnswer = getWinningAnswer(row[0]);
                break;
        }
        return winLoseTie(row[0], myAnswer);
    });

    return data.reduce((acc, val) => acc + val);
}

function getLosingAnswer(opponent) {
    switch (opponent) {
        case 'R':
            return 'S';
        case 'P':
            return 'R';
        case 'S':
            return 'P';
    }
}

function getWinningAnswer(opponent) {
    switch (opponent) {
        case 'R':
            return 'P';
        case 'P':
            return 'S';
        case 'S':
            return 'R';
    }
}

function part1Solution(data) {
    data = data.replaceAll(/(A|X)/img, 'R');
    data = data.replaceAll(/(B|Y)/img, 'P');
    data = data.replaceAll(/(C|Z)/img, 'S');

    data = data.split('\n').map(row => row.split(' '))
    data = data.map(row => {

        return winLoseTie(row[0], row[1]);
    });

    return data.reduce((acc, val) => acc + val);
}

function winLoseTie(a, b) {
    let sum = 0;
    switch (b) {
        case 'R':
            sum += 1
            break
        case 'P':
            sum += 2
            break

        case 'S':
            sum += 3
            break
    }
    if (a === b) {
        return sum + 3
    }
    if (a === 'R' && b === 'S' || a === 'S' && b === 'P' || a === 'P' && b === 'R') {
        return sum + 0
    }
    return sum + 6

}

main();