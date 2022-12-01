(async () => {
	const {promises} = require('fs');
	
	data = await promises.readFile('FilePathToInput', 'utf-8');

	let highest = 0;
	let sum = 0;
	const strings = data.split('\n');
	strings.map(s => {
		if (s === "") {
			if (sum > highest) {
				highest = sum;
			}
			sum = 0;
			return;
		}
		
		sum += parseInt(s, 10);
	});
	
	console.log(highest);
})();