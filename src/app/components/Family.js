import React from 'react';


class Family extends React.Component {
  constructor(){
    super();
  }
  componentDidMount(){
    console.log('didMntFamily');
    console.log(this.props);
  }
  componentWillReceiveProps(nextProps){
    console.log('receiveFamily');
  }
  
  
  render(){
    console.log('renderFamily');
    return (
      <div >
          <h1 align="center">Family Members</h1>
      </div>
    )
  }
}

export default Family;
