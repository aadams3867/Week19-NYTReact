// Include React 
var React = require('react');

// Create the Saved Component
var Saved = React.createClass({

/*	// Set generic states associated with a blank form
	getInitialState: function(){
		return {
			archive: []
		}
	},*/

	render: function(){

		var archive = this.props.archive;

		return(

			<div className="container">

				<div className="row">

					{/* *************** SAVED *************** */}
					<div className="panel panel-default">
						<div className="panel-heading">
							<h3 className="panel-title"><span className="glyphicon glyphicon-download-alt" aria-hidden="true"></span> Saved Articles</h3>
						</div>
						<div className="panel-body">

							{/*If (archive is empty) then ("Save your first article...") else (Display archive of saved articles)*/}
							{ (!archive.length) ? ("Save your first article...") : (

								<ul className="list-group">
									
									{/* Map function to loop through an array in JSX */}
									{archive.map(function(article, i){
										return <li className="list-group-item" key={i}>
											<div>

												<h3><em>{archive[i].title}</em>
													<span className="btn-group pull-right">								
														<a href="LINK" target="_blank">
															<button className="btn btn-info">View Article</button>
														</a>
														<button className="btn btn-danger">Delete</button>
													</span>
												</h3>
												<p>
													<span>Date Published: </span>
													<span>{archive[i].date}</span>
												</p>
											
											</div>
										</li>

									})}

								</ul>

							) }
							
{/*							<p>{this.props.archive}</p>*/}

						</div>
					</div>

				</div>

			</div>
		)
	}
});

// Export the component back for use in other files
module.exports = Saved;