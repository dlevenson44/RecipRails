import React from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { Card, Typography } from '@material-ui/core';
import FavoriteButton from './FavoriteButton';
import Auth from '../Authentication/authHelpers';

const Recipe = (props) => {
	const isAuthenticated = useStoreState(state => state.user.isAuthenticated)
	const addFavorite = useStoreActions(actions => actions.favorite.add)
	const { calories, label, ingredientLines, shareAs } = props.recipe;
	const token = Auth.getToken()
	const handleClick = () => {
		return addFavorite({token, calories, label, shareAs, ingredientLines })
	}

	return (
		<Card>
			<Typography>
				{label}
			</Typography>
			<Typography>
				{calories}
			</Typography>
			{ingredientLines.map((ingredient, idx) => (
				<Typography key={idx}>{ingredient}</Typography>
			))}
			<Typography>Instructions:  <a href={shareAs}>Click Here!</a></Typography>
			{isAuthenticated && <FavoriteButton onClick={handleClick} text="Add Favorite" />}
		</Card>
	);
};

export default Recipe;
