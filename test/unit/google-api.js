import test from 'blue-tape'

import getRestaurants from '../../lib/get-restaurants.js'

test(' test get-restaurants returns restaurants', function(t) {
	return getRestaurants(-41.2865, 174.7762, 500).then((res) => {
		t.ok(res.length > 1,  "rest array has restaurant objects")
		
		t.deepEqual(Object.keys(res[0]), [ 'id', 'name', 'photo', 'open_now' ], 'keys of rest obs are correct')
		t.deepEqual(res[0].photo.substring(0, 4), "http", "photo key has a sting value, first letter H")

	})
})