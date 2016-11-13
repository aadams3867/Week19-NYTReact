// Include the axios package for performing HTTP requests (promise based alternative to request)
var axios = require('axios');

// New York Times API Key
var nytAPI = "8aa4038a8bcf45b08bdee33b15fae758";

// Helper Functions (in this case the only one is runQuery)
var helpers = {

	runQuery: function(searchTerms, beginDate, endDate){

		console.log(searchTerms + " from " + beginDate + " - " + endDate);

		// Assemble the query for the NY Times
		var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json"
		queryURL += "?q=" + $.param({ 
			'api-key': nytAPI,
			'q': searchTerms,
			'begin_date': beginDate,
			'end_date': endDate
		});

		// Perform a GET request
		return axios.get(queryURL)
			.then(function(response){

				console.log(response);
				return response.data.results[0].formatted;
		})

	}

}


// We export the helpers function (which contains getGithubInfo)
module.exports = helpers;