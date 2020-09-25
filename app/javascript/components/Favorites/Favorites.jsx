import React, { useEffect} from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';
import Recipe from '../RecipeSearch/Recipe';
import Auth from '../Authentication/authHelpers';

const Favorites = () => {
	const { isAuthenticated } = useStoreState(state => state.user)
	const { results } = useStoreState(state => state.favorite)
	const { fetch, remove } = useStoreActions(actions.favorite)
	const token = Auth.getToken()
	useEffect(() => {
		fetch(token)
	}, [])

	const handleClick = recipe => {
		return remove({ token, id: recipe.id })
	}

	if (!!results.length) {
		return results.map(({
			label,
			calories,
			instructions,
			ingredients,
			id,
		}) => (
			<Recipe
				label={label}
				calories={calories}
				instructions={instructions}
				ingredients={ingredients}
				key={id}
				isAuthenticated={isAuthenticated}
				onClick={handleClick}
			/>
		))
	}

	return null;

}

export default Favorites;
