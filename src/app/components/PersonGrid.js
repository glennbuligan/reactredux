import React, { Component } from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import axios from 'axios';
import {connect} from 'react-redux';
import {mapStateToProps, mapDispatchToProps} from '../App';

class PersonGrid extends Component{
	constructor(props){
		super(props);
		this.state = {
			rowIndex: 0
		};
		console.log('griddConstruct');
	}
	
	componentDidMount(){
		console.log('griddidMount');
	}
	
	componentWillReceiveProps(nextProps){
		console.log('receiveGrid');
		/*this.setState({
				rowIndex: nextProps.rowIndex
		});*/
	}
	componentDidUpdate(){
		console.log('GridDidUpdate');
	}

	onAfterSearch = (searchText, result) =>{
		if(result.length > 0 && searchText != null){
			this.props.displayPerson(result[0]);
		}
	}
	render(){
		console.log('renderGrid');
		console.log(this.props);
		const selectRowProp = {
			mode: 'radio',
			clickToSelect: true,
			selected: [this.state.rowIndex],
			bgColor: 'gray',
			onSelect: (row, isSelected, e, rowIndex) =>{
				this.props.displayPerson(row, rowIndex);
			}
		}
		const options = {
			clearSearch: true,
			afterSearch: this.onAfterSearch
		}
		return(
			<div>
				<BootstrapTable data={this.props.persons} selectRow={selectRowProp} search={true} options={options} isSelected='true'
								>
			      <TableHeaderColumn dataField="id" isKey={true} dataAlign="center" dataSort={true}>ID</TableHeaderColumn>
			      <TableHeaderColumn dataField="lastName" >Last Name</TableHeaderColumn>
			      <TableHeaderColumn dataField="firstName" >First Name</TableHeaderColumn>
			      <TableHeaderColumn dataField="middleName" >Middle Name</TableHeaderColumn>
			      <TableHeaderColumn dataField="city" >City</TableHeaderColumn>
			      <TableHeaderColumn dataField="country" >Country</TableHeaderColumn>
  				</BootstrapTable>
        	</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(PersonGrid);

