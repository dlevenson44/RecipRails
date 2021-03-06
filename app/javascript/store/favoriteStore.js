import { thunk, action } from 'easy-peasy';
import axios from 'axios';
import Auth from '../components/Authentication/authHelpers'

const favorite = {
	isLoading: false,
	results: null,
	add: thunk(async (actions, payload) => {
		actions.startLoading();
		const { token, calories, label, instructions, ingredients } = payload;
		const headers = {
			'Content-Type': 'application/json',
			'token': token,
			'Authorization': `Token ${token}`,
		};
		console.log('payload:   ', payload)
		const favoriteData = {
			favorite: {
				label,
				calories,
				instructions,
				ingredients,
			},
		};
		console.log('favorite data:   ', favoriteData)

		try {
			await axios.post('/favorite', favoriteData, { headers })
				.then(() => {
					actions.successfulCall()
				});
		} catch(e) {
			actions.setError()
			console.error(`Error Adding Favorite:   ${e}`)
		}
	}),
	fetch: thunk(async (actions, payload) => {
		actions.startLoading();
		const { token } = payload;
		const headers = {
			'Content-Type': 'application/json',
			'token': token,
			'Authorization': `Token ${token}`
		}

		try {
			await axios.get('/favorite', { headers })
				.then(res => {
					console.log('res:   ', res)
					actions.successfulRecipeFetch(res.data)
				})
		} catch (e) {
			actions.setError();
			console.error(`Error Fetching Favorites:   ${e}`)
		}
	}),
	remove: thunk(async (actions, payload) => {
		actions.startLoading();
		const { token, id } = payload
		const headers = {
			'Content-Type': 'application/json',
			'token': token,
			'Authorization': `Token ${token}`
		}

		try {
			await axios.delete('/favorite', payload, { headers })
			.then(() => {
				actions.successfulCall()
			})
		} catch(e) {
			actions.setError();
			console.error(`Error Removing Favorite:   ${e}`)
		}
	}),
	successfulRecipeFetch: action((state, payload) => {
		state.isLoading = false;
		state.favorites = payload
	}),
	successfulCall: action((state, payload) => {
		state.isLoading = false;
	}),
	setError: action(state => {
		state.error = true;
		state.isLoading = false
	}),
	startLoading: action(state => {
		state.isLoading = true;
	})
};

export default favorite;
