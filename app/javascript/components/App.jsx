import React from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { StoreProvider } from 'easy-peasy';
import store from '../store/globalStore';
import Home from './Home';

const App = () => (
		<StoreProvider store={store}>
			<BrowserRouter>
				<Switch>
					<Route exact path="/" component={() => <Home state={store} />} />
				</Switch>
			</BrowserRouter>
		</StoreProvider>
);

export default App;
