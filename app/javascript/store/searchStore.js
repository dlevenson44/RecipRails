import { thunk, action } from 'easy-peasy';
import axios from 'axios';

const search = {
	isLoading: false,
	error: false,
	results: null,
	search: thunk(async (actions, payload) => {
		actions.startLoading();
		const headers = {
			'Content-Type': 'application/json',
			payload,
		};

		try {
			await axios.get('/search', { headers })
				.then(res => {
					console.log('response:   ', res)
					if (!res.data.results.count) {
						return actions.setFailedSearch(true)
					}

					return actions.setSuccessfulSearch(res.data.results.hits)
				})
		} catch(e) {
			console.error('Search Error:   ', e);
			actions.setFailedSearch(true);
		}
	}),
	setSuccessfulSearch: action((state, payload) => {
		console.log('payload:   ', payload)
		state.isLoading = false;
		state.results = payload;
	}),
	setFailedSearch: action(state => {
		state.isLoading = false;
		state.error = true;
	}),
	startLoading: action(state => {
		state.isLoading = true;
	})
}

export default search;
