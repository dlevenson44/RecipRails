import React, { useState } from 'react';
import { Button, Container, TextField } from '@material-ui/core';
import { useStoreActions, useStoreState } from 'easy-peasy';

const SearchBar = () => {
	const search = useStoreActions(actions => actions.search.search);
	const searchState = useStoreState(state => state.search);
	const [searchPhrase, setSearchPhrase] = useState(null)
	const { error, isLoading } = searchState;
	const handleChange = e => {
		setSearchPhrase(e.target.value);
	};
	const handleClick = async (searchPhrase) => {
		await search(searchPhrase);
	};

	return (
		<Container maxWidth="sm">
			<TextField
				label="Search Recipes"
				value={searchPhrase || ''}
				onChange={handleChange}
				error={!!error}
				disabled={isLoading}
			/>
			<Button
				onClick={() => handleClick(searchPhrase)}
				color="primary"
				variant="contained"
				disabled={isLoading || !searchPhrase}
			>
				SEARCH
			</Button>
		</Container>
	);
};

export default SearchBar;
