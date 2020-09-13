import { thunk, action } from 'easy-peasy';
import axios from 'axios';

const search = {
	isLoading: false,
	error: null,
	results: [],
	search: thunk(async (actions, payload) => {
		actions.startLoading();
		const headers = {
			'Content-Type': 'application/json',
			payload,
		};

		try {
			await axios.get('/search', { headers })
				.then(res => {
					actions.setSuccessfulSearch(res.data)
				})
		} catch(e) {
			console.error('Search Error:   ', e);
			actions.setFailedSearch(e);
		}
	}),
	setSuccessfulSearch: action((state, payload) => {
		state.isLoading = false;
		state.results = payload;
	}),
	setFailedSearch: action((state, payload) => {
		state.isLoading = false;
		state.error = payload;
	}),
	startLoading: action(state => {
		state.isLoading = true;
	})
}

export default search;
