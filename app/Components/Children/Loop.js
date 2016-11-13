// This will create a loop that repeats numTimes
function Loop() {

	var items = [];
	var numTimes = 5;
	for (var i=0; i<numTimes; i++) {
		console.log(i);
		items.push(i);
		console.log(items);
	}
	return <div>{items}</div>;
}