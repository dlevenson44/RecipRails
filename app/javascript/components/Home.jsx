import React from 'react';
import PropTypes from 'prop-types';
import Nav from './Nav';

const Home = props => {
	const { links, session } = props.state;
	console.log('Home props:   ', props);

	return (
		<div>
			<p>Home!</p>
		</div>
	);
};

export default Home;
