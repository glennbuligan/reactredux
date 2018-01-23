import React from 'react';
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import axios from 'axios';
import {PUT_API, GET_WEATHER_API} from '../actions/stringConst';
import {connect} from 'react-redux';
import {mapStateToProps, mapDispatchToProps} from '../App';

class Weather extends React.Component{
	constructor(){
		super();
		this.state = {
			location: '',
			temp_min: '',
			temp_max: '',
			lat: 0, 
			lon: 0 
		};
	}
	
	componentDidMount(){
		console.log('WeatherDidMount');
	}

	componentWillReceiveProps(nextProps){
		console.log('receiveWeather');
		this.setState({
		        lat: nextProps.person.weather?nextProps.person.weather.lat:0,
		        lon: nextProps.person.weather?nextProps.person.weather.lon:0,
		        temp_max: nextProps.person.weather?nextProps.person.weather.temp_max:'',
		        temp_min: nextProps.person.weather?nextProps.person.weather.temp_min:'',
		        location: nextProps.person.weather?nextProps.person.weather.location:''
		});
	}
	getCityCoord = (evt) => {
		evt.preventDefault();
		axios.get(GET_WEATHER_API.replace("city", this.state.location))
			.then(result=>{
				console.log('RESULT:');
				const { person } = this.props;
				person.city = result.data.name;
				person.country = result.data.sys.country;
				person.weather.lat = result.data.coord.lat;
				person.weather.lon = result.data.coord.lon;
				person.weather.temp_min = result.data.main.temp_min;
				person.weather.temp_max = result.data.main.temp_max;
				person.weather.location = result.data.name;
				console.log(person);
				axios.put(PUT_API.replace("personId", person.id), person)
					.then(result=>{
						console.log('RESULTPUT:');
						this.props.editPerson(result.data);
					});
			});
	}

	changeLocation = (evt) => {
	    this.setState({
	       location : evt.target.value
	    });
  	};
  	
	render(){
		console.log('renderWeather');
		return(
			<div>
				<div>
				<form onSubmit={this.getCityCoord}>
					<h4>The weather for
						<input placeholder={"City"} type="text" value={this.state.location} onChange={this.changeLocation}/>
					</h4>
				</form>
				<p className="temp-wrapper">
					<b><span className="temp">{ this.state.temp_min }</span>
					<span className="temp-symbol"> °C</span></b>
				</p>
				<p className="temp-wrapper">
					<b><span className="temp">{ this.state.temp_max }</span>
					<span className="temp-symbol"> °C</span></b>
				</p>
				</div>
				<div>
	          		<SimpleMapExampleGoogleMap
		                lat={this.state.lat}
		                lng={this.state.lon}
		                containerElement={
		                  <div style={{ height: `500px` }} />
		                }
		                mapElement={
		                  <div style={{ height: `500px` }} />
		                }
	            	/>
        		</div>
			</div>
			
		);
	}
}

const SimpleMapExampleGoogleMap = withGoogleMap( props => {
	const google = window.google;
    console.log("here new props are used", props)
    return <GoogleMap
      defaultZoom={8}
      center={new google.maps.LatLng(props.lat, props.lng)}>
      <Marker position={new google.maps.LatLng(props.lat, props.lng)}
                	/>
    </GoogleMap>
 	}
);


export default connect(mapStateToProps, mapDispatchToProps)(Weather);
