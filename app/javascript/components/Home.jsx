import React from 'react';

const Home = props => {
	console.log('Home props:   ', props);
	console.log('specified state', props.state.getState())
	return <p>Home!</p>
};

export default Home;
