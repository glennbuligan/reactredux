import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from 'react-redux';
import {createStore, combineReducers} from 'redux';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import personReducer from './reducers/personReducer';
import userReducer from './reducers/userReducer';
import LogInModal from './components/LogInModal';
import MainPage from './components/MainPage';
import SignUp from './components/SignUp';
import Family from './components/Family';

const personStore = createStore(combineReducers({personReducer, userReducer, routing: routerReducer}));

const history = syncHistoryWithStore(browserHistory, personStore);

ReactDOM.render(
	<Provider store={personStore}>
		<Router history={history}>
      		<Route path="/" component={App}>
        		<IndexRoute component={LogInModal}/>
        		<Route path="main" component={MainPage}/>
        		<Route path="signup" component={SignUp}/>
        		<Route path="family" component={Family}/>
      		</Route>
    	</Router>
	</Provider>, document.getElementById('root'));


