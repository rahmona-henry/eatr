
// export const updateRestaurants = (newRestaurants) => {
// 	return {
// 		type: 'UPDATE_RESTAURANTS',
// 		state: newRestaurants
// 	}
// }

// export const changePreferences = (newPreferences) => {
// 	return {
// 		type: 'CHANGE_PREFERENCES',
// 		state: newPreferences
// 	}
// }

// export const changeViewDetail = (bool) => {
// 	return {
// 		type: 'CHANGE_VIEW_DETAIL',
// 		state: bool
// 	}
// }


// export const addToShortlist = (restaurant) => {
// 	return {
// 		type: 'ADD_TO_SHORTLIST',
// 		state: restaurant
// 	}
// }

// export const removeFromShortList = (restaurant) => {
// 	return {
// 		type: 'REMOVE_From_SHORTLIST',
// 		id: restaurant
// 	}
// }

export const changeRestaurant = (index) => {
	return {
		type: 'CHANGE_RESTAURANT',
		index
	}
}




