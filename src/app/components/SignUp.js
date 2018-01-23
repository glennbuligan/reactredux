import React from 'react';
import Modal from 'simple-react-modal';
import {connect} from 'react-redux';
import {mapStateToProps, mapDispatchToProps} from '../App';
import {GET_USERS_API, GET_PERSONS_BY_USERID} from '../actions/stringConst';
import axios from 'axios';
import { browserHistory } from 'react-router';

class SignUp extends React.Component {
  constructor(){
    super();
    this.state = {
      show: false,
      user: {
        username: '',
        password: '',
        lastName: '',
        firstName: ''
      },
      userExist:false
    }
  }
  componentDidMount(){
    console.log('didMntSignUp');
    console.log(this.props);
    this.setState({
      show: true
    });
  }
  componentWillReceiveProps(nextProps){
    console.log('receiveSignUp');
  }
  checkUserExist = () =>{
    let count=0;
    for(let i=0; i<this.props.users.length; i++){
      if(this.props.users[i].username === this.state.user.username &&
        this.props.users[i].password === this.state.user.password){
        count++;
      }
    }
    if(count == 0){
      const { user } = this.state;
      axios.post(GET_USERS_API, user)
           .then(result=>{
            console.log('RESULTSignUp:');
            this.props.loadCurrentUser(result.data);
            browserHistory.push('/main');
            this.props.loadDefault({});
        });
    }else{
      console.log('User already exist');
      this.setState({userExist: true});
    }
  }
  show = () =>{
      this.setState({show: true})
    }
   
  close = () =>{
    this.setState({show: false})
  }
  inputOnChange = (evt) =>{
    switch(evt.currentTarget.name){
      case 'username':
        this.setState({
          user:{
            ...this.state.user,
            username: evt.currentTarget.value
          }
        });
        return;
      case 'password':
        this.setState({
          user:{
            ...this.state.user,
            password: evt.currentTarget.value
          }
        });
        return;
        case 'lastName':
        this.setState({
          user:{
            ...this.state.user,
            lastName: evt.currentTarget.value
          }
        });
        return;
      case 'firstName':
        this.setState({
          user:{
            ...this.state.user,
            firstName: evt.currentTarget.value
          }
        });
        return;
    }
  }
  render(){
    console.log('renderSignUp');
    return (
      <div >
        <Modal
            className="test-class" 
            show={this.state.show}>

        <div className="modal-dialog">
          <div className="modal-content">
              <div className="modal-header">
                    <button type="button" className="close" onClick={this.close}>&times;</button>
                    <h1 className="modal-title">Sign Up User</h1>
              </div>
              <div className="modal-body">
                    <div>
                        <form className='form-vertical'>
                          <div className='form-group'>
                            <label className='control-label '>Enter LastName: </label>
                            <div >
                              <input className='form-control' placeholder='LastName' type='text' value={this.state.user.lastName} onChange={this.inputOnChange} name='lastName'/>
                            </div>
                          </div>
                          <div className='form-group'>
                            <label className='control-label '>Enter FirstName: </label>
                            <div >
                              <input className='form-control' placeholder='FirstName' type='text' value={this.state.user.firstName} onChange={this.inputOnChange} name='firstName'/>
                            </div>
                          </div>
                          <div className='form-group'>
                            <label className='control-label '>Enter Username: </label>
                            <div >
                              <input className='form-control' placeholder='Username' type='text' value={this.state.user.username} onChange={this.inputOnChange} name='username'/>
                            </div>
                          </div>
                          <div className='form-group'>
                            <label className='control-label '>Enter Password: </label>
                            <div >
                              <input className='form-control' placeholder='Password' type='password' value={this.state.user.password} onChange={this.inputOnChange} name='password'/>
                            </div>
                          </div>
                        </form>
                        <div>
                              {this.state.userExist && <UserExist />}
                        </div>
                    </div>
              </div>
              <div className="modal-footer">
                    <button type="button" className="btn btn-default" onClick={this.close}>Cancel</button>
                    <button type="button" className="btn btn-success" onClick={this.checkUserExist}>Sign Up</button>
              </div>
          </div>
        </div>

        </Modal>
      </div>
    )
  }
}

const UserExist=()=>{
      return(
          <div className="alert alert-warning">
              <strong>Warning!</strong> User already exist!
          </div>
      )
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);