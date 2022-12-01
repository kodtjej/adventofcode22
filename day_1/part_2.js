(async () => {
	const {promises} = require('fs');
	
	data = await promises.readFile('FilePathToInput', 'utf-8');

	let listOfElves = [];
	let sum = 0;
	const strings = data.split('\n');
	strings.map(s => {
		if (s === "") {
			listOfElves.push(sum);
			sum = 0;
			return;
		}
		
		sum += parseInt(s, 10);
	});
	
	listOfElves.sort((a, b) => b - a);
	console.log(listOfElves[0] + listOfElves[1] + listOfElves[2]);

})();