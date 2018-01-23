import React from 'react';
import { Link } from 'react-router';

class NavBar extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			showLogIn: '',
			showLogOut: 'hidden'
		}
	}
	componentWillReceiveProps(nextProps){
		console.log('receiveNavBar');
		this.setState({
			showLogIn: nextProps.userId>0?'hidden':'',
			showLogOut: nextProps.userId>0?'':'hidden'
		})
	}
	render(){
		return(
			<nav className="navbar navbar-inverse">
			  <div className="container-fluid">
			    <div className="navbar-header">
			      <a className="navbar-brand" href="#">ReactRedux Demo</a>
			    </div>
			    <ul className="nav navbar-nav">
			      <li><Link style={this.props.userId==0 ? {pointerEvents: "none"} : null} to="/main">Home</Link></li>
			      <li><Link style={this.props.userId==0 ? {pointerEvents: "none"} : null} to="/family">Family</Link></li>
			    </ul>
			    <ul className="nav navbar-nav navbar-right">
			      <li><Link to="/signup" className={this.state.showLogIn}><span className="glyphicon glyphicon-user"></span> Sign Up</Link></li>
			      <li><Link to="/" className={this.state.showLogIn}><span className="glyphicon glyphicon-log-in"></span> Log In</Link></li>
			      <li><Link to="/" className={this.state.showLogOut}><span className="glyphicon glyphicon-log-out"></span> Log Out</Link></li>
			    </ul>
			  </div>
			</nav>
		)
	}
}

export default NavBar;