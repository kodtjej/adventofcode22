import {promises as fs} from 'fs';
import _ from 'underscore';

const input = './day_4/input';

async function main() {
    const data = await fs.readFile(input, 'utf-8');
    const answerOne = answerPart1(data);
    const answerTwo = answerPart2(data);

    console.log(answerOne);
    console.log(answerTwo);
}
function answerPart2(data) {
    const elfPairs = data.split('\n').map(d => d.split(',')).map(r => r.map(s => {
        let p = s.split('-')
        return {fromSection:parseInt(p[0]), toSection:parseInt(p[1])}
    })).map(pair => {
        let stuff = [];
        pair.map(elf => {
            for(let i=elf.fromSection; i<= elf.toSection; i++){
                stuff.push(i);
            }
        });
        return stuff;
    });

    return elfPairs.map(pairSections => pairSections.length === _.unique(pairSections).length ? 0 : 1).reduce((acc,val) => acc + val)

}
function answerPart1 (data){
    const elfPairs = data.split('\n').map(d => d.split(',')).map(r => r.map(s => {
        let p = s.split('-')
        return {fromSection:parseInt(p[0]), toSection:parseInt(p[1])}
    })).flatMap(elfPair => ({firstElf: elfPair[0], secondElf:elfPair[1]}));
    let duplicatePairs = 0;

    elfPairs.map(elfPair => {
        const firstElfSectionContainedInSecondElfs = elfPair.firstElf.fromSection >= elfPair.secondElf.fromSection && elfPair.firstElf.toSection<= elfPair.secondElf.toSection;
        const secondElfSectionContainedInFirstElfs = elfPair.secondElf.fromSection >= elfPair.firstElf.fromSection && elfPair.secondElf.toSection<= elfPair.firstElf.toSection;

        if (firstElfSectionContainedInSecondElfs || secondElfSectionContainedInFirstElfs){
            duplicatePairs += 1;
        }
    })

    return duplicatePairs
}

main();
