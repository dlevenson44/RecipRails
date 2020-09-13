import React from 'react';
import { Card, Typography } from '@material-ui/core';

const Recipe = (props) => {
	const { calories, label, ingredientLines, shareAs } = props.recipe;
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
		</Card>
	);
};

export default Recipe;
