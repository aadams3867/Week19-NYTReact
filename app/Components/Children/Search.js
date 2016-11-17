// Include React 
var React = require('react');

// Create the Search Component
var Search = React.createClass({

	// This function will respond to the user input
	handleChange: function(event){
    	// Here we create syntax to capture any change in data input to the form (pre-search).
    	// See this Stack Overflow answer for more details: 
    	// http://stackoverflow.com/questions/21029999/react-js-identifying-different-inputs-with-one-onchange-handler
    	var newState = {};
    	newState[event.target.id] = event.target.value;
    	this.setState(newState);
	},

	// When a user submits a search...
	handleClick: function(){
		console.log("CLICK received.  Telling the Parent to search for: " + this.state.searchTerms + " from " + this.state.startYear + " to " + this.state.endYear);
		this.props.setData(this.state.searchTerms, this.state.startYear, this.state.endYear);
	},

	// When a user saves an article...
	handleSave: function(article, event){
		console.log("SAVE request received.  Telling the database to save the following article: " + article);

		helpers.postArchive(article.title, article.date, article.url)
			.then(function(data) {}
			.bind(this))

/*		// This binding is necessary to make `this` work in the callback
		this.handleSave = this.handleSave.bind(this);
		this.props.setData(this.state.archive.slice(0, 1));*/
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

							{/*If (resultsArray is empty) then ("Enter search terms to begin...") else (Display top 5 results) */}
							{ (!resultsArray.length) ? ("Enter search terms to begin...") : (

								<ul className="list-group">
								
									{/* Map function to loop through an array in JSX */}
									{resultsArray.map(function(article, i){
										return <li className="list-group-item" key={i}>
											<div>
												
												<h3><em>{article.title}</em>
													<span className="btn-group pull-right">								
														<a href={article.url} target="_blank">
															<button className="btn btn-info">View Article</button>
														</a>
														<button className="btn btn-success">Save</button>
{/*														<button className="btn btn-success" onClick={(e) => this.handleSave(e)}>Save</button>*/}
{/*														<button className="btn btn-success" onClick={this.handleSave.bind(this, article)}>Save</button>*/}
													</span>
												</h3>
												<p>
													<span>Date Published: </span>
													<span>{article.date}</span>
												</p>

											</div>
										</li>
									})}

								</ul>
							)}
						</div>
					</div>

				</div>
			</div>

		)
	}
});

// Export the component back for use in other files
module.exports = Search;