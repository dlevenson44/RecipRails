import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ThemeProvider, Container } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import { StoreProvider } from 'easy-peasy';
import theme from '../styles/theme';
import store from '../store/globalStore';
import Nav from './Nav';
import Home from './Home';
import Login from './Login';
import Register from './Register';


const App = () => {
	const state = store.getState();
	return (
		<StoreProvider store={store}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<Container>
					<BrowserRouter>
						<Switch>
							<Nav links={state.links} isAuthenticated={state.session.isAuthenticated} />
							<Route exact path="/" component={() => <Home state={state} />} />
							<Route path="/login" component={() => <Login state={state} />} />
							<Route path="/register" component={() => <Register state={state} />} />
						</Switch>
					</BrowserRouter>
				</Container>
			</ThemeProvider>
		</StoreProvider>
	);
};

export default App;
