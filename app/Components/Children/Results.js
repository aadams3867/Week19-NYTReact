// Include React 
var React = require('react');

// Helper Functions
var helpers = require('../utils/helpers.js');

// Create the Results Component
var Results = React.createClass({

	// When a user saves an article...
	handleClick: function(article, event){
		console.log("SAVE request received.  Telling the database to save the following article: " , article);
		
		// Post the article to the db
		helpers.postArchive(article.title, article.date, article.url)
			.then(function(data) {

				// Get the revised list of saved articles
				helpers.getArchive()
					.then(function(articleData) {

						this.setState({
							archive: articleData
						})
						console.log("Revised saved articles list", articleData);
						// Send the revised list back to the Parent
/*						this.props.setArchive(articleData);*/

					}.bind(this)
				)

			}.bind(this)
		)


	},

	render: function(){

		var resultsArray = this.props.results;
		var archive = this.props.archive;

		return(
			<div className="container">
				<div className="row">
				

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
														<button className="btn btn-success" onClick={this.handleClick.bind(this, article)}>Save</button>
													</span>
												</h3>
												<p>
													<span>Date Published: </span>
													<span>{article.date}</span>
												</p>

											</div>
										</li>
									}.bind(this))}

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
module.exports = Results;