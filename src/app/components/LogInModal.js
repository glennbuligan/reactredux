import React from 'react';
import Modal from 'simple-react-modal';
import {connect} from 'react-redux';
import {mapStateToProps, mapDispatchToProps} from '../App';
import {GET_USERS_API, GET_PERSONS_BY_USERID} from '../actions/stringConst';
import axios from 'axios';
import { browserHistory } from 'react-router';

class LogInModal extends React.Component {
  constructor(){
    super();
    this.state = {
      show: true,
      username: '',
      password: '',
      invalidLogin: false
    }
  }
  componentDidMount(){
    console.log('didMntModal');
    this.props.loadCurrentUser({});
    this.props.loadDefault({});
    axios.get(GET_USERS_API)
      .then(result=>{
        console.log('RESULTModal:');
        this.props.loadInitUsers(result.data);
      });
  }
  componentWillReceiveProps(nextProps){
    console.log('receiveModal');
  }
  checkUser = () =>{
    let user={};
    let count=0;
    for(let i=0; i<this.props.users.length; i++){
      if(this.props.users[i].username === this.state.username &&
        this.props.users[i].password === this.state.password){
        user = this.props.users[i];
        this.props.loadCurrentUser(user);
        count++;
        break;
      }
    }

    if(count!=0){
      axios.get(GET_PERSONS_BY_USERID.replace('USER_ID', user.id))
           .then(result=>{
            console.log('RESULTModal:');
            if(result.data.length>0){
              this.props.loadInitPersons(result.data);
            }else{
              this.props.loadDefault({});
            }
            });
            this.setState({
              show: false
            });
            browserHistory.push('/main');
    }else{
      console.log('Invalid Username n Password');
      this.setState({invalidLogin: true});
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
          ...this.state,
          username: evt.currentTarget.value
        });
        return;
      case 'password':
        this.setState({
          ...this.state,
          password: evt.currentTarget.value
        });
        return;
    }
  }
  render(){
    console.log('renderMODAL');
    return (
      <div >
        <Modal
            className="test-class" 
            show={this.state.show}>

        <div className="modal-dialog">
          <div className="modal-content">
              <div className="modal-header">
                    <button type="button" className="close" onClick={this.close}>&times;</button>
                    <h1 className="modal-title">User Credentials</h1>
              </div>
              <div className="modal-body">
                    <div>
                        <form className='form-vertical'>
                          <div className='form-group'>
                            <label className='control-label '>Enter Username: </label>
                            <div >
                              <input className='form-control' placeholder='Username' type='text' value={this.state.username} onChange={this.inputOnChange} name='username'/>
                            </div>
                          </div>
                          <div className='form-group'>
                            <label className='control-label '>Enter Password: </label>
                            <div >
                              <input className='form-control' placeholder='Password' type='password' value={this.state.password} onChange={this.inputOnChange} name='password'/>
                            </div>
                          </div>
                        </form>
                        <div>
                              {this.state.invalidLogin && <InvalidUnPass />}
                        </div>
                    </div>
              </div>
              <div className="modal-footer">
                    <button type="button" className="btn btn-default" onClick={this.close}>Cancel</button>
                    <button type="button" className="btn btn-success" onClick={this.checkUser}>Log In</button>
              </div>
          </div>
        </div>

        </Modal>
      </div>
    )
  }
}

const InvalidUnPass=()=>{
      return(
          <div className="alert alert-warning">
              <strong>Warning!</strong> Invalid Username n Password!
          </div>
      )
}

export default connect(mapStateToProps, mapDispatchToProps)(LogInModal);