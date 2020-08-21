import React, { useState } from 'react';
import { Button, Container, TextField, Typography } from '@material-ui/core';
import { useStoreActions, useStoreState } from 'easy-peasy';
import style from './forms';

const Register = () => {
	const classes = style();
	const register = useStoreActions(actions => actions.user.register);
	const session = useStoreState(state => state.user);
	const [user, setUser] = useState({
		username: '',
		password: '',
		confirmPassword: '',
		name: '',
		email: '',
	});

	const handleChange = e => {
		const { name, value } = e.target;
		setUser({ ...user, [name]: value });
	};

	return (
		<Container maxWidth="sm" className={classes.container}>
			<Typography>CREATE ACCOUNT</Typography>
			<TextField
				required 
				label="Username"
				name="username"
				value={user.username}
				onChange={handleChange}
				helperText="Username must be at least 3 characters."
				error={user.username.length < 3}
				disabled={session.isLoading}
			/>
			<TextField
				required 
				type="password"
				label="Password"
				name="password"
				value={user.password}
				onChange={handleChange}
				helperText="Password must contain at least 8 characters, a lower case letter, an upper case letter, a number, and a special character."
				disabled={session.isLoading}
			/>
			<TextField
				required 
				type="password"
				label="Confirm Password"
				name="confirmPassword"
				value={user.confirmPassword}
				onChange={handleChange}
				helperText="Passwords must match."
				error={user.password !== user.confirmPassword}
				disabled={session.isLoading}
			/>
			<TextField
				required 
				label="Name"
				name="name"
				value={user.name}
				onChange={handleChange}
				disabled={session.isLoading}
			/>
			<TextField
				required 
				label="Email"
				name="email"
				value={user.email}
				onChange={handleChange}
				disabled={session.isLoading}
			/>
			<Button onClick={() => register(user)} color="primary" variant="contained" disabled={session.isLoading}>CREATE ACCOUNT</Button>
		</Container>
	)
};

export default Register;
