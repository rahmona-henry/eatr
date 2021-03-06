import request from 'superagent'
require('dotenv').config()
import queryString from 'query-string'

import getPhoto from './get-photo.js'
import getDetail from './get-detail.js'
import cleanupRestaurants from './cleanup-restaurants.js'

export default (lat = -41.296940, lon = 174.773897, radius = 200, moreRestsToken = undefined) => {
	let query = queryString.stringify({
		pagetoken: moreRestsToken,	
		location: lat + ',' + lon,
		radius: radius,
		type: 'restaurant',
		key: process.env.GOOGLE_API_KEY,
	},false)
	return new Promise ((resolve, rej) => {
		request
		  .get('https://maps.googleapis.com/maps/api/place/nearbysearch/json?' + query )
		  .end(function(err, res){
		  	if(err) {
		  		console.log('there has been an error in superagent', err)
		  		rej(err)
		  	} else {
		  		// console.log(res.body, "RES BODY IN GETRESTS")
					resolve(cleanupRestaurants(res, lat, lon))	      
		    }
	   })	
	})
	.then(getPhoto)
	.then(getDetail)
	.then((restaurantObjects) =>{

		return {restaurantObjects}
	})
	.catch(handleError)
}

function handleError (error) {
	console.log("Error happened somewhere in get-restaurants ", error)
}


