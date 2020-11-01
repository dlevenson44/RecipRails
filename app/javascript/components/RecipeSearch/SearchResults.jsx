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
		return add({ ...recipe, token })
	}

	if (results) {
		return results.map((recipeResult, idx) => {
			let recipe = {}
			if (recipeResult.recipe) {
				const { calories, label, ingredientLines, shareAs } = recipeResult.recipe;
				recipe = { calories, label, ingredients: ingredientLines, instructions: shareAs  };
			} else {
				const { calories, label, ingredients, instructions } = recipeResult;
				recipe = { calories, label, ingredients, instructions  };
			}
			const { calories, label, ingredients, instructions } = recipe;

			return (
				<Recipe
					label={label}
					calories={calories}
					ingredients={ingredients}
					instructions={instructions}
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
