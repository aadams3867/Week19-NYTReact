// Include React 
var React = require('react');
import { Link } from 'react-router'
import { IndexLink } from 'react-router'

// Here we include all of the sub-components
var Search = require('./Children/Search');
var Saved = require('./Children/Saved');

// Helper Function - contains GET request code for NYT API
var helpers = require('./utils/helpers.js');

// This is the main component.
var Main = React.createClass({

	// Set generic states associated with a blank form
	getInitialState: function(){
		return {
			searchTerms: "",
			startYear: "",
			endYear: "",
			results: ""
		}
	},

	// Create a function for updating the data from the form input
	setData: function(term, start, end){
		this.setState({
			searchTerms: term,
			startYear: start,
			endYear: end
		})
	},

	// This lifecycle event will run every single time the Main component is updated by the children
	componentDidUpdate: function(prevProps, prevState) {
		if (prevState.searchTerms != this.state.searchTerms) {
			console.log("Updated");
			helpers.runQuery(this.state.searchTerms)
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

			<div className="main-container">
				<div className="container">

					<div className="row">

						<nav className="navbar navbar-default">
						  <div className="container-fluid">
						    <div className="navbar-header">
						      <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
						        <span className="sr-only">Toggle navigation</span>
						        <span className="icon-bar"></span>
						        <span className="icon-bar"></span>
						        <span className="icon-bar"></span>
						      </button>
						      <IndexLink className="navbar-brand" to="/" activeStyle={{ color: "#18bc9c" }}>NYT React</IndexLink>
						    </div>

						    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
						      <ul className="nav navbar-nav navbar-right">
						        <li><Link to="/search" activeStyle={{ color: "#18bc9c" }}>Search</Link></li>
						        <li><Link to="/saved" activeStyle={{ color: "#18bc9c" }}>Saved Articles</Link></li>
						      </ul>
						    </div>
						  </div>
						</nav>


						<div className="jumbotron">
						  <h1 className="text-center">New York Times Article Scrubber</h1>
						  <h5 className="text-center"><em>Now with ReactJS goodness!</em></h5>
						  <h2 className="text-center">Search for and save articles of interest.</h2>
						</div>


						<div className="row" id="searchDiv">
							<div className="col-lg-12">
								{/*SEARCH and Results section*/}
								<Search setData = {this.setData} results = {this.state.results}/>

							</div>
						</div>


						<div className="row" id="savedDiv">
							<div className="col-lg-12">
								{/*SAVED section*/}
								<Saved archive = {this.state.results}/>

							</div>
						</div>

{/*						{this.props.children}*/}

					</div>

				</div>
			</div>
		)
	}
});

// Export the component back for use in other files
module.exports = Main;