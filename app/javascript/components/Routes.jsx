import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { useStoreState } from 'easy-peasy';
import Auth from './Authentication/authHelpers';
import Nav from './Nav';
import Home from './Home';
import Login from './Authentication/Login';
import Register from './Authentication/Register';
import Search from './RecipeSearch/Search';

const Routes = () => {
	const state = useStoreState(state => state);
	const { isAuthenticated } = state.user;

	return (
		<BrowserRouter>
			<Nav links={state.links} />
			<Switch>
				<Route exact path="/" component={() => <Search />} />
				<Route path="/login" render={() => (!isAuthenticated ? <Login /> : <Redirect to="/" /> )} />
				<Route path="/register" render={() => (!isAuthenticated ? <Register /> : <Redirect to="/" />)} />
			</Switch>
		</BrowserRouter>
	);
};

export default Routes;
