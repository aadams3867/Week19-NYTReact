// Include React 
var React = require('react');

// Here we include all of the sub-components
var Form = require('./Children/Form');
var Results = require('./Children/Results');

// Helper Function - contains GET request code for geocode API
var helpers = require('./utils/helpers.js');

// This is the main component.
var Main = React.createClass({

	// Set generic states associated with a blank form
	getInitialState: function(){
		return {
			searchTerm: "",
			results: ""
		}
	},

	// Create a function for updating the searchTerm from the form input
	setTerm: function(term){
		this.setState({
			searchTerm: term
		})
	},

	// This lifecycle event will run every single time the Main component is updated by the children
	componentDidUpdate: function(prevProps, prevState) {
		if (prevState.searchTerm != this.state.searchTerm) {
			console.log("Updated");
			helpers.runQuery(this.state.searchTerm)
				.then(function(data) {
					if (data != this.state.results) {
						console.log("HERE");
						console.log(data);

						this.setState({
							results: data
						})
					}
				// This code is necessary to bind the keyword "this" when we say this.setState
				// to actually mean the component itself and not the runQuery function.
				}.bind(this))
		}
	},

	// Here we render the function
	render: function(){

		return(

			<div className="container">

				<div className="row">

					<div className="jumbotron">
						<h2 className="text-center">Address Finder!</h2>
						<p className="text-center"><em>Enter a landmark to search for its exact address (Ex: "Eiffel Tower")</em></p>
					</div>


					{/*This represents the "Form" Child*/}
					<div className="col-md-6">
							<div>
								<Form setTerm = {this.setTerm}/>
							</div>
					</div>

					{/*This represents the "Results" Child*/}
					<div className="col-md-6">
							<div>
								<Results address = {this.state.results}/>
							</div>
					</div>


				</div>

			</div>
		)
	}
});

// Export the componen back for use in other files
module.exports = Main;