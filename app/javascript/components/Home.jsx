import React from 'react';
import PropTypes from 'prop-types';
import Nav from './Nav';

const Home = props => {
	const { links, session } = props.state;

	return (
		<div>
			<p>Home!</p>
		</div>
	);
};

export default Home;
