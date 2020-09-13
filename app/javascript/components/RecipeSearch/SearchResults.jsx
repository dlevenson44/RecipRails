import React from 'react';
import { useStoreState } from 'easy-peasy';
import Recipe from './Recipe';

const SearchResults = () => {
	const results = useStoreState(state => state.search.results);

	if (!!results.length) {
		return results.map((recipe, idx) => (
			<Recipe recipe={recipe.recipe} key={idx} />
		));
	};

	return null;
};

export default SearchResults;
