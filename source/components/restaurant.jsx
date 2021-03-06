import React 								from 'react'
import YeahNahBar 					from './yeah-nah-bar.jsx'
import Details 							from './restaurant-details.jsx'
import Swipeable 						from 'react-swipeable'
import updateServer 				from '../helpers/update-server.js'
import getUser 							from '../helpers/get-user.js'
import {connect} 						from 'react-redux'
import getMoreRestaurants 	from '../helpers/get-more-restaurants.js'
import * as actionCreators 	from '../action-creators';
import Splash								from './splash.jsx'

export class Restaurant extends React.Component {

	constructor(props) {
		super(props)
		this.nextPage = false
	}

  swipeLeft (index) {
  	if(index === 19 ) {
  		this.nextPage = true
  	}
  	const {location, restaurant, updateRestaurants, changeRestaurant} = this.props
	  if(this.nextPage){
			changeRestaurant(0)  
	  	getMoreRestaurants(location, restaurant.restaurant['next_page'])
				.then(updateRestaurants)
					.then( () => {
						this.nextPage = false
						changeRestaurant(0)
						})
	  } else {
	  	changeRestaurant(index)
  	}
 	}

  swipeRight(index, restaurant) {
  	if(index === 19 && restaurant['next_page'] ) {
  		this.nextPage = true
  		
  	}

  	const {
  		location, 
  		updateRestaurants,
	  	changeRestaurant,
	  	user,
	  	shortlist,
		  addToShortlist} = this.props
	   
	  if(this.nextPage){
		    user.name ? updateServer(shortlist, restaurant) : null
		    addToShortlist(restaurant)
		    changeRestaurant(0) 
		  	getMoreRestaurants(location, restaurant['next_page'])
		  		.then(updateRestaurants)
		  		.then( () => {
						this.nextPage = false
						changeRestaurant(0)  
						})
	  	} else {
	  		user.name ? updateServer(shortlist, restaurant) : null
		    changeRestaurant(index)
		    addToShortlist(restaurant)
  	}
  }

  componentWillMount () {
  	if (this.props.user.name === 'none') {
	    getUser()
	      .then(this.props.updateUser)
    }
  }

 	render  () {

		const {restaurant, index, ShowDetail } = this.props.restaurant
		const {changeViewDetail} = this.props

			if (this.nextPage) {
				return (<Splash />)
			}else {
			  return (<Swipeable 
				  delta={50} 
				  onSwipedLeft={() => this.swipeLeft(index+1)}
			  	onSwipedRight={() => this.swipeRight(index+1,restaurant)}>
					<div id="restaurant-container" >
						<div id="restaurant-card" onClick={() => changeViewDetail() }>
							<div id="img-window">
								<img id="restaurant-image" src={restaurant.photo}/>
							</div>
							<div id="description-window">
								<h3 className="short-details">{restaurant.name}</h3>
								<h6 className="short-details gray-text">{restaurant.distance}m </h6>
							</div>
								{(ShowDetail)? 
									<Details 
										name={restaurant.name}
										website={restaurant.website} 
										phone={restaurant.phone} 
										address={restaurant.address} /> : 
									null
								}
						</div>
						<YeahNahBar 
							reject={index => this.swipeLeft(index)} 
							add={(index, restaurant) => this.swipeRight(index, restaurant)} 
							{...this.props}/>
					</div>
				</Swipeable>
			)
		}
	}
}


function mapStateToProps (state) {
  return {
    restaurant: state.Restaurant,
    user: state.User,
    shortlist: state.ShortList,
    location: state.Location
  }
}

export const RestaurantContainer = connect(
  mapStateToProps,
  actionCreators
  )(Restaurant)

