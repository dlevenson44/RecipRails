import React from 'react';
import { Button } from '@material-ui/core';

const FavoriteButton = props => {
	const { onClick, text } = props;
	return (
		<Button
			color="primary"
			onClick={onClick}
			variant="contained"
		>
			{text}
		</Button>
	);
};

export default FavoriteButton;
