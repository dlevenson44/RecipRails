import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { Link, Typography } from '@material-ui/core';

const Nav = props => {
	const { links, isAuthenticated } = props;

	return (
		<Typography>
			<Link component={RouterLink} to="/">{links.constant}</Link>
			{!isAuthenticated ? (
				links.unauthenticated.map(item => (
					<Link key={item} component={RouterLink} to={`/${item.toLowerCase()}`}>{item}</Link>
				))
			) : (
				links.authenticated.map(item => (
					<Link key={item} component={RouterLink} to={`/${item.toLowerCase()}`}>{item}</Link>
				))
			)}
		</Typography>
	);
}

export default Nav;
