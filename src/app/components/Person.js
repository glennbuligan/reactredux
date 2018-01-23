import React, { Component } from 'react';
import axios from "axios";
import {PUT_API, DELETE_API, POST_API, GET_WEATHER_API, GET_PERSONS_BY_USERID} from '../actions/stringConst';
import {connect} from 'react-redux';
import {mapStateToProps, mapDispatchToProps} from '../App';

class Person extends Component{
	constructor(){
		super();
		this.state = {
			person: {
				lastName: '',
				firstName: '',
				middleName: '',
				city: '',
				country: '',
				weather: {
					location: '',
					temp_min: '',
					temp_max: '',
					lat: 0, 
					lon: 0 
				},
				id: 0
			}

		}
		this.inputOnChange = this.inputOnChange.bind(this);
	}
	
	componentDidMount(){
		console.log('personDidMount');
	}
	
	componentWillReceiveProps(nextProps){
		console.log('receivePerson');
		this.setState({
			person: {
				lastName: nextProps.person.lastName?nextProps.person.lastName:"",
				firstName: nextProps.person.firstName?nextProps.person.firstName:"",
				middleName: nextProps.person.middleName?nextProps.person.middleName:"",
				city: nextProps.person.city?nextProps.person.city:"",
				country: nextProps.person.country?nextProps.person.country:"",
				id: nextProps.person.id?nextProps.person.id:0,
				weather: nextProps.person.weather?nextProps.person.weather:{}
			}
		});
	}

	addNewPerson = (evt) =>{
		
		axios.get(GET_WEATHER_API.replace("city", this.state.person.city))
			.then(result=>{
				console.log('RESULT:');
				const person = {
					userId: this.props.user.id,
					lastName: this.state.person.lastName,
					firstName: this.state.person.firstName,
					middleName: this.state.person.middleName,
					city: result.data.name,
					country: result.data.sys.country,
					weather: {
						location: result.data.name,
						temp_min: result.data.main.temp_min,
						temp_max: result.data.main.temp_max,
						lat: result.data.coord.lat, 
						lon: result.data.coord.lon
					}
				}
				axios.post(POST_API, person)
					.then(result=>{
						console.log('RESULTADD:');
						this.props.addPerson(result.data);
					});
			});
		
	}
	
	editPerson = () =>{
		console.log('update');

		axios.get(GET_WEATHER_API.replace("city", this.state.person.city))
			.then(result=>{
				console.log('RESULT:');
				const { person } = this.state;
				person.userId = this.props.user.id;
				person.city = result.data.name;
				person.country = result.data.sys.country;
				person.weather.lat = result.data.coord.lat;
				person.weather.lon = result.data.coord.lon;
				person.weather.temp_min = result.data.main.temp_min;
				person.weather.temp_max = result.data.main.temp_max;
				person.weather.location = result.data.name;
				console.log(person);
				axios.put(PUT_API.replace('personId', this.state.person.id), person)
					.then(result=>{
						console.log('RESULTPUT:');
						this.props.editPerson(result.data);
					});
			});
	}

	deletePerson = () =>{
		console.log('delete');

		axios.delete(DELETE_API.replace("personId", this.state.person.id))
			.then(result=>{
				console.log('RESULTDEL:');
				axios.get(GET_PERSONS_BY_USERID.replace("USER_ID", this.props.user.id))
					.then(result=>{
						console.log('RESULTDELGET:');
						if(result.data.length>0){
						    this.props.loadInitPersons(result.data);
						}else{
						    this.props.loadDefault({});
						}
					});
			});
	}
	
	inputOnChange(evt){
		switch(evt.currentTarget.name){
			case 'lastName':
				this.setState({
					person:{
						...this.state.person,
						lastName: evt.currentTarget.value
					}
				});
				return;
			case 'firstName':
				this.setState({
					person:{
						...this.state.person,
						firstName: evt.currentTarget.value
					}
				});
				return;
			case 'middleName':
				this.setState({
					person:{
						...this.state.person,
						middleName: evt.currentTarget.value
					}
				});
				return;
			case 'city':
				this.setState({
					person:{
						...this.state.person,
						city: evt.currentTarget.value
					}
				});
				return;
			case 'country':
				this.setState({
					person:{
						...this.state.person,
						country: evt.currentTarget.value
					}
				});
				return;
		}
	}
	
	render(){
		console.log('renderPerson');
		return(
			<div>
				<br/>
				<form className='form-horizontal'>
					<div className='form-group'>
						<label className='control-label col-sm-4'>Enter Last Name: </label>
						<div className='col-sm-6'>
							<input className='form-control' placeholder='Last Name' type='text' value={this.state.person.lastName} onChange={this.inputOnChange} name='lastName'/>
						</div>
					</div>
					<div className='form-group'>
						<label className='control-label col-sm-4'>Enter First Name: </label>
						<div className='col-sm-6'>
							<input className='form-control' placeholder='First Name' type='text' value={this.state.person.firstName} onChange={this.inputOnChange} name='firstName'/>
						</div>
					</div>
					<div className='form-group'>
						<label className='control-label col-sm-4'>Enter Middle Name: </label>
						<div className='col-sm-6'>
							<input className='form-control' placeholder='Middle Name' type='text' value={this.state.person.middleName} onChange={this.inputOnChange} name='middleName'/>
						</div>
					</div>
					<div className='form-group'>
						<label className='control-label col-sm-4'>Enter City: </label>
						<div className='col-sm-6'>
							<input className='form-control' placeholder='City' type='text' value={this.state.person.city} onChange={this.inputOnChange} name='city'/>
						</div>
					</div>
					<div className='form-group'>
						<label className='control-label col-sm-4'>Enter Country: </label>
						<div className='col-sm-6'>
							<input className='form-control' placeholder='Country' type='text' value={this.state.person.country} onChange={this.inputOnChange} name='country' readOnly='true'/>
						</div>
					</div>
					<br/>
				</form>
				<div className='form-group'>
					<label className='control-label col-sm-4'></label>
					<div className='btn-group col-sm-8'>
						<button className='btn btn-success' onClick={this.addNewPerson}> ADD </button>
						<button className='btn btn-warning' onClick={this.editPerson}> EDIT </button>
						<button className='btn btn-danger' onClick={this.deletePerson}> DELETE </button>
					</div>
				</div>
			</div>
		);
	}

}


export default connect(mapStateToProps, mapDispatchToProps)(Person);


