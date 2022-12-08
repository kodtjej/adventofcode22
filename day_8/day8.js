import {promises as fs} from 'fs';

const input = await fs.readFile('./day_8/test_input', 'utf-8');
const treeMap = parseMatrix(input);

async function main() {
    const answerOne = answerPart1();
//    const answerTwo = answerPart2(data);

    console.log(answerOne);
//    console.log(answerTwo);
}

function answerPart1(){
    let visibleTrees = 0;
    for(let row = 0; row < treeMap.length; row++){
        for(let col = 0; col < treeMap[row].length; col++){
            if(treeIsVisible(col, row)){
                visibleTrees++;
            }
        }
    }
    return visibleTrees;
}

function treeIsVisible(col, row){
    if(col === 0 || col === treeMap[row].length-1 || row===0 || row === treeMap.length){
        return true;
    }

    // check row
    for()

    //check col

}

function parseMatrix(data){
    return data.split(/\n/).map(d => d.split('').map(i => parseInt(i)));
}

main();
