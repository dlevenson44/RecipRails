import { thunk, action } from 'easy-peasy';
import axios from 'axios';

const favorite = {
	isLoading: false,
	add: thunk(async (actions, payload) => {
		actions.startLoading();
		const { token, calories, label, ingredientLines, shareAs } = payload;
		const headers = {
			'Content-Type': 'application/json',
			'token': token,
			'Authorization': `Token ${token}`,
		};

		const favoriteData = {
			favorite: {
				label,
				calories,
				instructions: shareAs,
				ingredients: ingredientLines,
			},
		};

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
	remove: thunk(async (actions, payload) => {
		actions.startLoading();
		const headers = {
			'Content-Type': 'application/json',
		};

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
