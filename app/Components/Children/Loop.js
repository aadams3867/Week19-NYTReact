// Include React 
var React = require('react');

{/* Here we use a map function to loop through an array in JSX*/}
/*{this.props.history.map(function(search, i)
	{
		return <p key={i}>{search.location} - {search.date}</p> 
	}
)}*/



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

// Export the component back for use in other files
module.exports = Loop;