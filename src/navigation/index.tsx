import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import Login from '../components/pages/Login';
import Dashboard from '../components/pages/Dashboard';
//import Header from '../components/Header.js';
//import Footer from '../components/Footer.js';
import '../App.css';
import { RootState } from '../reducers';
import * as storage from "../libs/storage";
import Actions from '../actions';

export default function AppRouter() {
	const dispatch = useDispatch();

	useEffect(() => {
		(async () => {
			const accessToken = await storage.get(storage.Key.Token);
			const refreshToken = await storage.get(storage.Key.RefreshToken)
			if (accessToken && refreshToken) dispatch(Actions.Auth.Token({ accessToken, refreshToken }));
		})();
	}, []);
	
	const token = useSelector((state: RootState) => state.auth.user?.access_token);

	return (
		<Router>
			<div id="main-container">
				<Switch>
					<Route exact path='/'>
						{token ? <Dashboard /> : <Redirect to="/login" />}
					</Route>
					<Route path='/login'>
						{token ? <Redirect to="/" /> : <Login />}
					</Route>
				</Switch>
			</div>
		</Router>
	)
};