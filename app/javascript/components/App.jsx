import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { StoreProvider } from 'easy-peasy';
import theme from '../styles/theme';
import store from '../store/globalStore';
import Home from './Home';

const App = () => (
		<StoreProvider store={store}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<BrowserRouter>
					<Switch>
						<Route exact path="/" component={() => <Home state={store} />} />
					</Switch>
				</BrowserRouter>
			</ThemeProvider>
		</StoreProvider>
);

export default App;
