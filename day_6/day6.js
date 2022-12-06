import {promises as fs} from 'fs';

const input = './day_6/input';

async function main() {
    const data = await fs.readFile(input, 'utf-8');
    const answerOne = answerPart1(data);
    const answerTwo = answerPart2(data);

    console.log(answerOne);
    console.log(answerTwo);

}

function answerPart2(data){
    let workArr = data.substring(0,14).split('');
    for(let i = 14; i<data.length; i++){
        const workSet = new Set(workArr);
        if(workSet.size === 14){
            return i
        }
        workArr.shift();
        workArr.push(data[i]);
    }
}
function answerPart1(data){
    for(let i=2; i < data.length-1; i++){
        const dSet = new Set([data[i-2], data[i-1], data[i], data[i+1]])
        if (dSet.size === 4) {
            return i+2; // i + 1 + 1 for 0 index array :P
        }
    }
    return data
}

main();
