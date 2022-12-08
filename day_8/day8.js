import {promises as fs} from 'fs';

const input = await fs.readFile('./day_8/input', 'utf-8');
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
    const currentTreeHeight = treeMap[row][col];
    // check row
    const currentRow = treeMap[row];
    const leftRowIsCovered = currentRow.slice(0, col).some(c => c >= currentTreeHeight);
    const rightRowIsCovered = currentRow.slice(col+1).some(c => c >= currentTreeHeight);
    const isVisibleFromSides = !leftRowIsCovered || !rightRowIsCovered;

    //check col
    let topIsCovered = false;
    let botIsCovered = false;
    for(let r = 0; r<treeMap.length; r++){
        if(r < row){
            if(treeMap[r][col] >= currentTreeHeight){
                topIsCovered = true;
            }
        }
        if(r > row){
            if(treeMap[r][col]>=currentTreeHeight){
                botIsCovered = true;
            }
        }
    }
    const isVisibleIFärdriktning = !topIsCovered || !botIsCovered;
    const isVisible =isVisibleIFärdriktning || isVisibleFromSides;
    return isVisible;

}

function parseMatrix(data){
    return data.split(/\n/).map(d => d.split('').map(i => parseInt(i)));
}

main();
