import {promises as fs} from 'fs';

const input = await fs.readFile('./day_8/test_input', 'utf-8');
const treeMap = parseMatrix(input);

async function main() {
    const answerOne = answerPart1();
    const answerTwo = answerPart2();

    console.log(answerOne);
    console.log(answerTwo);
}

function answerPart2() {
    let answer = 0;
    for (let row = 0; row < treeMap.length; row++) {
        for (let col = 0; col < treeMap[row].length; col++) {
            const scenicScore = calculateScenicScore(row, col);
            if (scenicScore > answer) {
                answer = scenicScore;
            }
        }
    }
    return answer;
}

function calculateScenicScore(row, col) {
    if (col === 0 || col === treeMap[row].length - 1 || row === 0 || row === treeMap.length - 1) {
        return 0;
    }

    const cross = [
        treeMap[row].slice(0, col).reverse(),
        treeMap[row].slice(col + 1),
        treeMap.reduce((arr, curr, index) => index < row ? [curr[col], ...arr] : arr, []),
        treeMap.reduce((arr, curr, index) => index > row ? [curr[col], ...arr] : arr, []).reverse()

    ];

    return cross.reduce((acc, direction) => acc * calculateSteps(direction, treeMap[row][col]), 1)
}

function calculateSteps(direction, currentTree) {
    let sightSteps = 0;

    for (const [index, tree] of direction.entries()) {
        ++sightSteps;
        if (tree >= currentTree && index > 0) {
            break;
        }
    }
    console.log("currentTree: ",currentTree, "steps: ", sightSteps,"direction: ", direction)
    return sightSteps
}

function answerPart1() {
    let visibleTrees = 0;
    for (let row = 0; row < treeMap.length; row++) {
        for (let col = 0; col < treeMap[row].length; col++) {
            if (treeIsVisible(col, row)) {
                visibleTrees++;
            }
        }
    }
    return visibleTrees;
}

function treeIsVisible(col, row) {
    if (col === 0 || col === treeMap[row].length - 1 || row === 0 || row === treeMap.length) {
        return true;
    }
    const currentTreeHeight = treeMap[row][col];
    // check row
    const currentRow = treeMap[row];
    const leftRowIsCovered = currentRow.slice(0, col).some(c => c >= currentTreeHeight);
    const rightRowIsCovered = currentRow.slice(col + 1).some(c => c >= currentTreeHeight);
    const isVisibleFromSides = !leftRowIsCovered || !rightRowIsCovered;

    //check col
    let topIsCovered = false;
    let botIsCovered = false;
    for (let r = 0; r < treeMap.length; r++) {
        if (r < row) {
            if (treeMap[r][col] >= currentTreeHeight) {
                topIsCovered = true;
            }
        }
        if (r > row) {
            if (treeMap[r][col] >= currentTreeHeight) {
                botIsCovered = true;
            }
        }
    }
    const isVisibleIFärdriktning = !topIsCovered || !botIsCovered;
    const isVisible = isVisibleIFärdriktning || isVisibleFromSides;
    return isVisible;

}

function parseMatrix(data) {
    return data.split(/\n/).map(d => d.split('').map(i => parseInt(i)));
}

main();
