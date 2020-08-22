import React, { useState } from 'react';
import { Button, Container, TextField, Typography } from '@material-ui/core';
import { useStoreActions, useStoreState } from 'easy-peasy';
import Validation from './validation';
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
	const { username, password, confirmPassword, email, name } = user;
	const isFormValid = Validation.isFormValid(username, password, confirmPassword, email, name);

	const handleChange = e => {
		const { name, value } = e.target;
		setUser({ ...user, [name]: value });
	};

	const handleClick = async (user) => {
		await register(user);
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
				error={Validation.validateUsername(username)}
				disabled={session.isLoading}
			/>
			<TextField
				required 
				type="password"
				label="Password"
				name="password"
				value={user.password}
				onChange={handleChange}
				helperText="Password must contain at least 8 characters, a lower case letter, an upper case letter, and a number."
				error={Validation.validatePassword(password)}
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
				error={Validation.validateConfirmPassword(password, confirmPassword)}
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
				error={Validation.validateEmail(email)}
				disabled={session.isLoading}
			/>
			<Button onClick={() => handleClick(user)} color="primary" variant="contained" disabled={session.isLoading || isFormValid}>CREATE ACCOUNT</Button>
		</Container>
	)
};

export default Register;
