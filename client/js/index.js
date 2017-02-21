import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import SignUpForm from './components/auth/signup';
import SignInForm from './components/auth/signin';
import MapDisplay from './components/pages/map_display';
import NewMapDisplay from './components/pages/new_map_display';
import UserAccountPage from './components/pages/user_account';
import store from './store';

const routes = (
  <Provider store={store}>
		<Router history={hashHistory}>
			<Route path = '/' component={MapDisplay} />
			<Route path = '/account' component={UserAccountPage} />
			<Route path= '/newmap/42' component={NewMapDisplay} />
		</Router>
  </Provider>
);

ReactDOM.render(
	routes,
	document.getElementById('root')
);

console.log(`Client running in ${process.env.NODE_ENV} mode`);

// <Provider store={store}>
// 			<UserAccountPage />
// 		</Provider>
