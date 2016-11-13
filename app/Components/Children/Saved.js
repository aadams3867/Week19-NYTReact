// Include React 
var React = require('react');

							var articles = true;

// Create the Saved Component
var Saved = React.createClass({

	render: function(){

		return(

			<div className="container">

				<div className="row">

					{/* *************** SAVED *************** */}
					<div className="panel panel-default">
						<div className="panel-heading">
							<h3 className="panel-title"><span className="glyphicon glyphicon-download-alt" aria-hidden="true"></span> Saved Articles</h3>
						</div>
						<div className="panel-body">



							{/*If (articles is false) then "Save your first article..." else (Display archive of saved articles)*/}
							{ (articles == false) ? ("Save your first article...") : (

								<ul className="list-group">
									<div>
										<li className="list-group-item">
											<h3><em>{/*{TITLEofSavedArticle}*/}Title of Saved Article</em>
												<span className="btn-group pull-right">								
													<a href="LINK" target="_blank">
														<button className="btn btn-info">View Article</button>
													</a>
													<button className="btn btn-danger">Delete</button>
												</span>
											</h3>
											<p>
												<span>Date Published: </span>
												<span>{/*{DATE}*/}</span>
											</p>
										</li>
									</div>

								</ul>

							) }
							
							<p>{this.props.archive}</p>

						</div>
					</div>

				</div>

			</div>
		)
	}
});

// Export the component back for use in other files
module.exports = Saved;