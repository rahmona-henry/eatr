import React from 'react'
import { Link } from 'react-router'
import Navlink from './navlink.jsx'

export default () => {

	return (
    <nav id='navbar'>
  		<Navlink to='/filter'>
        <img className="nav-icon" src="./images/settings-icon.png" alt="filter"/>
      </Navlink>
  		<Navlink to='/shortlist'>
        <img className="nav-icon" src="./images/shortlist-icon.png" alt="shortlist"/>
      </Navlink>
  		<Navlink to='/login'>
        <img className="nav-icon" src="./images/login.png" alt="login"/>
      </Navlink>
  	</nav>
  )

}