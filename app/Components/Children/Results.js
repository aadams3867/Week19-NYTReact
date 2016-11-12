// Include React 
var React = require('react');

// Create the Results Component
var Results = React.createClass({

	render: function(){

		return(

			<div className="panel panel-default">
				<div className="panel-heading">
					<h3 className="panel-title text-center">Results</h3>
				</div>
				<div className="panel-body text-center" style={{minHeight: "200px"}}>

					<h1>Address:</h1>
					
					<p>{this.props.address}</p>

				</div>
			</div>
		)
	}
});

// Export the component back for use in other files
module.exports = Results;