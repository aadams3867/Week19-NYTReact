// Include the axios package for performing HTTP requests (promise based alternative to request)
var axios = require('axios');

// New York Times API Key
var nytAPI = "8aa4038a8bcf45b08bdee33b15fae758";

// Helper Functions
var helpers = {

	// Runs the query to find relevant articles
	runQuery: function(searchTerms, beginYear, endYear){

		console.log(searchTerms + " from " + beginYear + " - " + endYear);

		// Assemble the query for the NY Times
		var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json"
		queryURL += "?" + $.param({ 
			'api-key': nytAPI,
			'q': searchTerms,
			// NYT API requires YYYYMMDD format for dates
			'begin_date': beginYear + "0101",	// Jan 1
			'end_date': endYear + "1231"		// Dec 31
		});

		// Perform a GET request
		return axios.get(queryURL)
			.then(function(response){
				// Log ALL the data received
				console.log("All the data received from the NYT: " , response);

				// Useful info extracted and pushed into an array
				var items = [];
				var title, date, url;
				for (var i=0; i<5; i++) {	// only need 5 articles
					title = response.data.response.docs[i].headline.main;
					date = response.data.response.docs[i].pub_date;
					url = response.data.response.docs[i].web_url;
					items.push({title, date, url});
				}

				// Log the array of 5 objects
				console.log("Just the useful data: " , items);

				return items;
		})

	},

	// Asks our own server to retrieve the archive of saved articles
	getArchive: function(){

		return axios.get('/api/saved')
			.then(function(response){

				console.log("Archive retrieved helpfully", response.data);
				return response.data;
			});
	},

	// Saves an article to our database.
	postArchive: function(title, date, url){

		return axios.post('/api/saved', {title: title, date: date, url: url})
			.then(function(results){

				console.log("Article saved to MongoDB helpfully", results.config.data);
				return(results.config.data);
			})
	},

	// Deletes a saved article from our database.
	deleteSaved: function(title, date, url){

		return axios.delete('/api/saved', {
			params: {
				title: title,
				date: date,
				url: url
			}
		})
		.then(function(results){

			console.log("Article deleted from MongoDB helpfully", results);
			return(results);
		})
	}

}


// We export the helpers function (which contains getGithubInfo)
module.exports = helpers;