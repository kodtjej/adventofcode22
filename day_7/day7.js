import {promises as fs} from 'fs';

const input = './day_7/input';

async function main() {
    const data = await fs.readFile(input, 'utf-8');
    const answerOne = answerPart1(data);
    const answerTwo = answerPart2(data);

    console.log(answerOne);
    console.log(answerTwo);
}


function answerPart2(data){
    const totalDiskSpace = 70000000;
    const minimumDiskSpace = 30000000;

    const home = parseInput(data);
    const minimumSpaceToFreeUp = minimumDiskSpace - (totalDiskSpace - home.size)
    return home.getAllDirectories().filter(d => d.size >= minimumSpaceToFreeUp).sort((a,b) => a.size-b.size)[0].size

}

function answerPart1(data) {
    return parseInput(data).getAllDirectories().filter(d => d.size <= 100000).reduce((acc, dir) => acc + dir.size,0);
}

function parseInput(data) {
    const lines = data.split(/\n/);
    let home = new Dir('/')
    let current = home;

    lines.shift();
    lines.map(l => {
        if (l.includes('$ cd ..')) {
            current = current.parent;
            return
        }
        if (l.includes('dir')) {
            current.directories.push(new Dir(l.split(' ')[1], current));

        }
        if (l.includes('$ cd') && !l.includes('..')) {
            current = current.changeDirectory(l.split(' ')[2]);
        }
        if (l.match(/\d+ [\w.]+/)) {
            const data = l.split(' ')
            current.files.push(new File(data[1], parseInt(data[0])))
        }
    });

    home.calculateSizes()
    return home

}

class Dir {
    parent;
    name;
    directories;
    files;
    size;

    constructor(name, parent) {
        this.name = name;
        this.directories = [];
        this.files = [];
        this.parent = parent;
    }

    calculateSizes() {
        this.size = this.files.reduce((acc, f) => acc + f.size, 0) + this.directories.reduce((acc, d ) => acc + d.calculateSizes(),0);
        return this.size;
    }

    getAllDirectories(){
        return this.directories.concat(this.directories.flatMap(d => d.getAllDirectories()));
    }

    changeDirectory(target){
        return this.directories.find(d => d.name === target);
    }

}

class File {
    name;
    size;

    constructor(name, size) {
        this.name = name;
        this.size = size;
    }
}

main();