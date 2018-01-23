import React, { Component } from 'react';
import {connect} from 'react-redux';
import {addPerson, displayPerson, editPerson, deletePerson, loadInitPersons, loadDefaultAction} from './actions/personAction';
import {loadInitUsersAction, loadCurrentUserAction} from './actions/userAction';
import {GET_API} from './actions/stringConst';
import axios from 'axios';
import NavBar from './components/NavBar';

class App extends Component {
	componentDidMount(){
		console.log('App did Mount');
	}
	componentWillReceiveProps(nextProps){
		console.log('receiveApp');
	}
	componentDidUpdate(){
		console.log('AppDidUpdate');
	}

	displayUserName(){
		return this.props.user.lastName?this.props.user.lastName+', '+this.props.user.firstName:"";
	}
  render() {
  	console.log('renderApp');
  	return (
	  <div className="container">
		<NavBar userId={this.props.user.id?this.props.user.id:0}/>
      	<p className="text-right text-uppercase font-weight-bold">{this.displayUserName()}</p>
        {this.props.children}
      </div>
    );
  }
}

export const mapStateToProps = (state) =>{
  return{
  	person: state.personReducer.person,
    persons: state.personReducer.persons,
    rowIndex: state.personReducer.rowIndex,
    users: state.userReducer.users,
    user: state.userReducer.user
  };
};

export const mapDispatchToProps = (dispatch) =>{
  return{
  	loadInitPersons: (person) =>{
      dispatch(loadInitPersons(person));
    },
    addPerson: (person) =>{
      dispatch(addPerson(person));
    },
    displayPerson: (person, rowIndex) =>{
      dispatch(displayPerson(person, rowIndex));
    },
    editPerson: (person) =>{
      dispatch(editPerson(person));
    },
    deletePerson: (person) =>{
      dispatch(deletePerson(person));
    },
    loadInitUsers: (users) =>{
      dispatch(loadInitUsersAction(users));
    },
    loadDefault: (user) =>{
      dispatch(loadDefaultAction(user));
    },
    loadCurrentUser: (user) =>{
      dispatch(loadCurrentUserAction(user));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);


