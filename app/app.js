// Include the Main React Dependencies
var React = require('react');
var ReactDOM = require('react-dom');

// Import React-Router stuffs
import { Router, Route, hashHistory } from 'react-router'

// Include the IndexRoute (catch-all route)
/*var IndexRoute	= Router.IndexRoute;*/

// Include the Components
var Main = require('./Components/Main')
var Search = require('./Components/Children/Search')
var Saved = require('./Components/Children/Saved')

// This code here allows us to render our main component (in this case "Main")
// and nested sub-components (to share navbar and jumbotron display)
ReactDOM.render((
	<Router history={hashHistory}>
		<Route path="/" component={Main}>
			<Route path="/search" component={Search}/>
			<Route path="/saved" component={Saved}/>

{/*			<IndexRoute component={Search}/>*/}
		</Route>
{/*		<Main />*/}
	</Router>
	), document.getElementById('app')
)