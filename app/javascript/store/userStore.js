import { thunk, action } from 'easy-peasy';
import axios from 'axios';
import Auth from '../components/Authentication/authHelpers';

const user = {
	isAuthenticated: Auth.isUserAuthenticated(),
	isLoading: false,
	loggedInUser: null,
	error: null,
	login: thunk(async (actions, payload) => {
		actions.startLoading();
		const headers = {
			'Content-Type': 'application/json',
		};

		try {
			await axios.post('/login', payload, { headers })
				.then(res => {
					Auth.authenticateToken(res.data.token)
					actions.setUser(res.data);
				});
		} catch (e) {
			actions.setFailedLogin(e.response.data.errors[0].detail)
			console.error(`Error Logging User In: ${e}`);
		}
	}),
	logout: thunk(async (actions, payload) => {
		const headers = {
			'Content-Type': 'application/json',
			'Authorization': `token ${payload}`,
			'token': payload,
		};

		try {
			await axios.delete('/logout', { headers })
				.then(() => {
					Auth.deauthenticateToken();
					actions.removeUser();
				});
		} catch (e) {
			console.error(`Error Logging Out: ${e}`);
		}
	}),
	removeUser: action(state => {
		state.isAuthenticated = false;
		state.loggedInUser = null;
	}),
	register: thunk(async (actions, payload) => {
		actions.startLoading();
		const headers = {
			'Content-Type': 'application/json',
		};

		delete payload.confirmPassword;
		const user = { user: payload };

		try {
			await axios.post('/register', user, { headers })
				.then(res => {
					Auth.authenticateToken(res.data.token);
					actions.setUser(res.data);
				});
		} catch (e) {
			actions.setFailedRegister(e.response.data.message)
			console.error(`Error Creating User: ${e}`);
		}
	}),
	setUser: action((state, user) => {
		state.isLoading = false;
		state.isAuthenticated = true;
		state.loggedInUser = user;
		state.error = false;
	}),
	setFailedLogin: action((state, payload) => {
		state.error = payload;
		state.isLoading = false;
	}),
	setFailedRegister: action((state, payload) => {
		const errorMessage = payload.slice(19);
		state.isLoading = false;
		state.error = errorMessage;
	}),
	startLoading: action(state => {
		state.isLoading = true;
	}),
	clearError: action(state => {
		state.error = null;
	}),
};

export default user;
