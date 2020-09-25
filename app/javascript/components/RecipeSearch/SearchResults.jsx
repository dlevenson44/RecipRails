import React from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';
import Recipe from './Recipe';
import Auth from '../Authentication/authHelpers';

const SearchResults = () => {
	const { isAuthenticated } = useStoreState(state => state.user)
	const { results } = useStoreState(state => state.search);
	const { add } = useStoreActions(actions => actions.favorites)
	const token = Auth.getToken()
	const handleClick = recipe => {
		console.log('adding recipe:   ', recipe)
		return add({ ...recipe, token })
	}

	if (!!results.length) {
		return results.map(({
			calories,
			label,
			ingredientLines,
			shareAs
		}, idx) => (
			<Recipe
				label={label}
				calories={calories}
				ingredients={shareAs}
				instructions={ingredientLines}
				key={idx}
				isAuthenticated={isAuthenticated}
				onClick={handleClick}
			/>
		));
	};

	return null;
};

export default SearchResults;
