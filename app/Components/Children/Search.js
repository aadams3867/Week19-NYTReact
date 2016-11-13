// Include React 
var React = require('react');

// Create the Search Component
var Search = React.createClass({

	// Set a generic state associated with the text being searched for
	getInitialState: function(){
		return {
			term: ""
		}
	},

	// This function will respond to the user input
	handleChange: function(event){
    	// Here we create syntax to capture any change in text to the query terms (pre-search).
    	// See this Stack Overflow answer for more details: 
    	// http://stackoverflow.com/questions/21029999/react-js-identifying-different-inputs-with-one-onchange-handler
    	var newState = {};
    	newState[event.target.id] = event.target.value;
    	this.setState(newState);
	},

	// When a user submits...
	handleClick: function(){
		console.log("CLICK to search for: " + this.state.term);
		this.props.setTerm(this.state.term);
	},

	render: function(){

		return(
			
			<div className="row">
				<div className="col-lg-12">
					
					<div className="panel panel-default">
						<div className="panel-heading">
							<h3 className="panel-title"><span className="glyphicon glyphicon-search" aria-hidden="true"></span> Query</h3>
						</div>

						<div className="panel-body">
							<form>
								<div className="form-group">
									<h4 className=""><strong>Search Topic</strong></h4>
									<input type="text" className="form-control" id="term" onChange= {this.handleChange} required/>
									<br />
									<h4 className=""><strong>Start Year</strong></h4>
									<input type="text" className="form-control" id="beginYear" onChange= {this.handleChange} required/>
									<br />
									<h4 className=""><strong>End Year</strong></h4>
									<input type="text" className="form-control" id="endYear" onChange= {this.handleChange} required/>
									<br />														
									<div className="text-center"><button type="button" className="btn btn-primary btn-lg" onClick={this.handleClick}>Submit</button></div>
								</div>
							</form>
						</div>
					</div>

					<div className="panel panel-default">
						<div className="panel-heading">
							<h3 className="panel-title"><span className="glyphicon glyphicon-th-list" aria-hidden="true"></span> Results</h3>
						</div>
						
						<div className="panel-body">

					    	Results show up here
					  
						</div>
					</div>


				</div>
			</div>
		)
	}
});

// Export the component back for use in other files
module.exports = Search;