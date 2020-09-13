import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { useStoreState } from 'easy-peasy';
import Auth from './Authentication/authHelpers';
import Nav from './Nav';
import Home from './Home';
import Login from './Authentication/Login';
import Register from './Authentication/Register';
import SearchBar from './RecipeSearch/SearchBar';
import SearchResults from './RecipeSearch/SearchResults';

const Routes = () => {
	const state = useStoreState(state => state);
	const { isAuthenticated } = state.user;
	const authenticated = Auth.isUserAuthenticated() || isAuthenticated;

	return (
		<BrowserRouter>
			<Nav links={state.links} isAuthenticated={authenticated} />
			<SearchBar />
			<SearchResults />
			<Switch>
				<Route exact path="/" component={() => <Home state={state} />} />
				<Route path="/login" render={() => (!authenticated ? <Login state={state} /> : <Redirect to="/" /> )} />
				<Route path="/register" render={() => (!authenticated ? <Register state={state} /> : <Redirect to="/" />)} />
			</Switch>
		</BrowserRouter>
	);
};

export default Routes;
