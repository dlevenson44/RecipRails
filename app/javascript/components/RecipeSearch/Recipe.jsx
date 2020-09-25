import React from 'react';
import PropTypes from 'prop-types';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { Card, Typography } from '@material-ui/core';
import FavoriteButton from './FavoriteButton';
import Auth from '../Authentication/authHelpers';

const Recipe = ({
	label,
	calories,
	ingredients,
	instructions,
	id,
	isAuthenticated,
	onClick
}) => {
	const recipe = { label, calories, ingredients, instructions, id }
	return (
		<Card>
			<Typography>
				{label}
			</Typography>
			<Typography>
				{calories}
			</Typography>
			{ingredients.map((ingredient, idx) => (
				<Typography key={idx}>{ingredient}</Typography>
			))}
			<Typography>Instructions:  <a href={instructions}>Click Here!</a></Typography>
			{isAuthenticated && <FavoriteButton onClick={onClick(recipe)} text="Add Favorite" />}
		</Card>
	);
};

Recipe.propTypes = {
	label:  PropTypes.string.isRequired,
	calories: PropTypes.string.isRequired,
	ingredients: PropTypes.array.isRequired,
	instructions: PropTypes.string.isRequired,
	id: PropTypes.string,
	isAuthenticated: PropTypes.bool.isRequired,
	onClick: PropTypes.func.isRequired
}

Recipe.defaultProps = {
	id: null
}

export default Recipe;
