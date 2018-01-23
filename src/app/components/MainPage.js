import React from 'react';
import PersonGrid from './PersonGrid';
import Person from './Person';
import Weather from './Weather';
import {connect} from 'react-redux';
import {mapStateToProps, mapDispatchToProps} from '../App';


class MainPage extends React.Component{
	constructor(){
		super();
		console.log('constructMainPage');
	}
	componentDidMount(){
		console.log('didMountMainPage');
	}
	componentWillReceiveProps(nextProps){
		console.log('receiveMainPage');
	}

	render(){
		console.log('renderMainPage');
		return(
			<div>
				<h1 align="center">HOMEPAGE</h1><br/>
				<div >
				    <PersonDetails person={this.props.person}/>
		        </div><br/>
		        <div>
		        	<PersonGrid />
		        </div><br/>
		        <div className='col-sm-6'>
		        	<Person />
		        </div>
		        <div className='col-sm-6'>
		        	<Weather />
		        </div>
	        </div>
		)
	}

}

const PersonDetails = (props) =>{
	return(
		<div >
			<div className='col-sm-6'>
				<form className='form-horizontal'>
				<div className='form-group'>
					<label className='control-label col-sm-4'>Last Name: </label>
					<div className='col-sm-6'>
						<input className='form-control' placeholder='Last Name' type='text' value={props.person.lastName?props.person.lastName:''}  name='lastName' readOnly='true'/>
					</div>
				</div>
				<div className='form-group'>
					<label className='control-label col-sm-4'>First Name: </label>
					<div className='col-sm-6'>
						<input className='form-control' placeholder='First Name' type='text' value={props.person.firstName?props.person.firstName:''} name='firstName' readOnly='true'/>
					</div>
				</div>
				<div className='form-group'>
					<label className='control-label col-sm-4'>Middle Name: </label>
					<div className='col-sm-6'>
						<input className='form-control' placeholder='Middle Name' type='text' value={props.person.middleName?props.person.middleName:''} name='middleName' readOnly='true'/>
					</div>
				</div>
				<br/>
				</form>
			</div>
			<div className='col-sm-6'>
				<form className='form-horizontal'>
				<div className='form-group'>
					<label className='control-label col-sm-4'>City: </label>
					<div className='col-sm-6'>
						<input className='form-control' placeholder='City' type='text' value={props.person.city?props.person.city:''} name='city' readOnly='true'/>
					</div>
				</div>
				<div className='form-group'>
					<label className='control-label col-sm-4'>Country: </label>
					<div className='col-sm-6'>
						<input className='form-control' placeholder='Country' type='text' value={props.person.country?props.person.country:''} name='country' readOnly='true'/>
					</div>
				</div>
					<br/>
				</form>
			</div>
		</div>
	)
		
}

//export default MainPage;
export default connect(mapStateToProps, mapDispatchToProps)(MainPage);