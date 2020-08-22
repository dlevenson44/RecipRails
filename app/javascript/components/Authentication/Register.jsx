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
	const { error, isLoading } = session;
	const { username, password, confirmPassword, email, name } = user;
	const isFormValid = Validation.isFormValid(username, password, confirmPassword, email, name);
	const isUsernameValid = !Validation.validateUsername(username);
	const isPasswordValid = !Validation.validatePassword(password);
	const isConfirmPasswordValid = !Validation.validateConfirmPassword(password, confirmPassword);
	const isEmailValid = !Validation.validateEmail(email);
	const handleChange = e => {
		const { name, value } = e.target;
		setUser({ ...user, [name]: value });
	};
	console.log('isLoading?   ', isLoading)
	console.log('isFormValid?  ', isFormValid)
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
				value={user.username || ''}
				onChange={handleChange}
				helperText={!isUsernameValid && "Username must be at least 3 characters."}
				error={!isUsernameValid}
				disabled={isLoading}
			/>
			<TextField
				required 
				type="password"
				label="Password"
				name="password"
				value={user.password || ''}
				onChange={handleChange}
				helperText={!isPasswordValid && "Password must contain at least 8 characters, a lower case letter, an upper case letter, and a number."}
				error={!isPasswordValid}
				disabled={isLoading}
			/>
			<TextField
				required 
				type="password"
				label="Confirm Password"
				name="confirmPassword"
				value={user.confirmPassword || ''}
				onChange={handleChange}
				helperText={!isConfirmPasswordValid && "Passwords must match."}
				error={!isConfirmPasswordValid}
				disabled={isLoading}
			/>
			<TextField
				required 
				label="Name"
				name="name"
				value={user.name || ''}
				onChange={handleChange}
				disabled={isLoading}
			/>
			<TextField
				required 
				label="Email"
				name="email"
				value={user.email || ''}
				onChange={handleChange}
				helperText={!isEmailValid && "Email Address Invalid"}
				error={!isEmailValid}
				disabled={isLoading}
			/>
			{error && (
				<Typography color="error" variant="caption" gutterBottom>{error}</Typography>
			)}
			<Button
				onClick={() => handleClick(user)}
				color="primary"
				variant="contained"
				disabled={isLoading || isFormValid}
			>
				CREATE ACCOUNT
			</Button>
		</Container>
	)
};

export default Register;
