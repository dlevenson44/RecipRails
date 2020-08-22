import React from 'react';
import PropTypes from 'prop-types';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { Link as RouterLink } from 'react-router-dom';
import { Link, Typography } from '@material-ui/core';
import Auth from './Authentication/authHelpers';

const Nav = props => {
	const { links, isAuthenticated } = props;
	const logout = useStoreActions(actions => actions.user.logout);
	const token = Auth.getToken();
	const handleClick = async () => {
		await logout(token);
	}
	return (
		<Typography>
			<Link component={RouterLink} to="/">{links.constant}</Link>
			{!isAuthenticated ? (
				links.unauthenticated.map(item => (
					<Link key={item} component={RouterLink} to={`/${item.toLowerCase()}`}>{item}</Link>
				))
			) : (
				links.authenticated.map(item => (
					<Link key={item} component={RouterLink} to={item !== 'Logout' ? `/${item.toLowerCase()}` : '/'} onClick={item === 'Logout' ? handleClick : null}>{item}</Link>
				))
			)}
		</Typography>
	);
}

export default Nav;
