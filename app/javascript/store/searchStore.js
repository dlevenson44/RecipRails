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
		};

		try {
			await axios.get('/search', { headers })
				.then(res => {
					console.log('results:   ', res)
					actions.setSuccessfulSearch(res.data)
				})
		} catch(e) {
			console.log('e search:   ', e);
			actions.setFailedSearch(e);
		}
	}),
	setSuccessfulSearch: action((state, payload) => {
		console.log('search payload:   ', payload)
		state.isLoading = false;
		state.results = payload;
	}),
	setFailedSearch: action((state, payload) => {
		console.log('error payload:   ', payload)
		state.isLoading = false;
		state.error = payload;
	}),
	startLoading: action(state => {
		state.isLoading = true;
	})
}

export default search;
