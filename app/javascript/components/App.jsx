import React from 'react'
import { ThemeProvider, Container } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import { StoreProvider } from 'easy-peasy';
import theme from '../styles/theme';
import store from '../store/globalStore';
import Routes from './Routes';

const App = () => {
	return (
		<StoreProvider store={store}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<Container>
					<Routes />
				</Container>
			</ThemeProvider>
		</StoreProvider>
	);
};

export default App;
