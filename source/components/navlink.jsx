import React , { Component } from 'react'
import {Link} from 'react-router'

export default class Navlink extends Component {

	render() {
		return <Link {...this.props} activeClassName="active"/>
	}

}