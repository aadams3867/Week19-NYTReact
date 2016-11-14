// Include React 
var React = require('react');/*
																				var gotResults = false;*/

// Loop Function - contains loop code for displaying
var Loop = require('./Loop');

// Create the Search Component
var Search = React.createClass({

	// Set a generic state associated with the text being searched for
	getInitialState: function(){
		return {
			searchTerms: "",
			startYear: "",
			endYear: "",
			results: []
		}
	},

	// This function will respond to the user input
	handleChange: function(event){
    	// Here we create syntax to capture any change in data input to the form (pre-search).
    	// See this Stack Overflow answer for more details: 
    	// http://stackoverflow.com/questions/21029999/react-js-identifying-different-inputs-with-one-onchange-handler
    	var newState = {};
    	newState[event.target.id] = event.target.value;
    	this.setState(newState);
	},

	// When a user submits...
	handleClick: function(){
		console.log("CLICK received.  Telling the Parent to search for: " + this.state.searchTerms + " from " + this.state.startYear + " to " + this.state.endYear);
		this.props.setData(this.state.searchTerms, this.state.startYear, this.state.endYear);
	},

	render: function(){

		var resultsArray = this.props.results;

		return(
			<div className="container">
				<div className="row">
				
					{/**************** SEARCH ****************/}
					<div className="panel panel-default">
						<div className="panel-heading">
							<h3 className="panel-title"><span className="glyphicon glyphicon-search" aria-hidden="true"></span> Search for Articles</h3>
						</div>

						<div className="panel-body">
							<form>
								<div className="form-group">
									<h4><strong>Search Topic</strong></h4>
									<input type="text" className="form-control" id="searchTerms" onChange= {this.handleChange} required/>
									<br />
									<h4><strong>Start Year</strong></h4>
									<input type="text" className="form-control" id="startYear" onChange= {this.handleChange} required/>
									<br />
									<h4><strong>End Year</strong></h4>
									<input type="text" className="form-control" id="endYear" onChange= {this.handleChange} required/>
									<br />														
									<div className="text-center"><button type="button" className="btn btn-primary btn-lg" onClick={this.handleClick}>Submit</button></div>
								</div>
							</form>
						</div>
					</div>

					{/**************** RESULTS ****************/}
					<div className="panel panel-default">
						<div className="panel-heading">
							<h3 className="panel-title"><span className="glyphicon glyphicon-th-list" aria-hidden="true"></span> Results</h3>
						</div>
						
						<div className="panel-body">

							{/*If (this.props.results[0].title is empty) then "Enter search terms to begin..." else (Display top 5 results) */}
							{ (resultsArray == []) ? ("Enter search terms to begin...") : (<div>{resultsArray}</div>) }

{/*									<ul className="list-group">
									
								{resultsArray.map(function(object, i){
										return <li key={i}>
											{[ object.title,
												object.date,
												object.url
											]}
										</li>;
									})}
										fsafsdf*/}

{/*
									{resultsArray.map(function(result){
										return ({result});
									})}*/}

{/*										<div>
											<li className="list-group-item">
												<h3><em>{resultsArray[0].title}</em>
													<span className="btn-group pull-right">								
														<a href={this.props.results[0].url} target="_blank">
															<button className="btn btn-info">View Article</button>
														</a>
														<button className="btn btn-success">Save</button>
													</span>
												</h3>
												<p>
													<span>Date Published: </span>
													<span>{this.props.results[0].date}</span>
												</p>
											</li>
										</div>



								</ul>



							)*/ }
					  
						</div>
					</div>

				</div>
			</div>

		)
	}
});

// Export the component back for use in other files
module.exports = Search;