import React from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';
import Recipe from './Recipe';
import Auth from '../Authentication/authHelpers';

const SearchResults = () => {
	const { isAuthenticated } = useStoreState(state => state.user)
	const { results } = useStoreState(state => state.search);
	const { add } = useStoreActions(actions => actions.favorite);
	const token = Auth.getToken()
	const handleClick = recipe => {
		console.log('adding recipe:   ', recipe)
		return add({ ...recipe, token })
	}

	if (results) {
		return results.map(({ recipe }, idx) => {
			const { calories, label, ingredientLines, shareAs } = recipe;

			return (
				<Recipe
					label={label}
					calories={calories}
					ingredients={ingredientLines}
					instructions={shareAs}
					key={idx}
					isAuthenticated={isAuthenticated}
					onClick={handleClick}
				/>
			);
		});
	};

	return null;
};

export default SearchResults;
