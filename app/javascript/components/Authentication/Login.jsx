import React, { useState } from 'react';
import { Button, Container, TextField, Typography } from '@material-ui/core';
import { useStoreActions, useStoreState } from 'easy-peasy';
import style from './forms';

const Login = () => {
	const classes = style();
	const login = useStoreActions(actions => actions.user.login);
	const session = useStoreState(state => state.user);
	const [user, setUser] = useState({
		username: '',
		password: '',
	});
	const { username, password } = user;
	const { error, isLoading } = session;
	const isButtonDisabled = !(username.length && password.length);
	const handleChange = e => {
		const { name, value } = e.target;
		setUser({ ...user, [name]: value });
	};

	const handleClick = async (user) => {
		await login(user);
	};

	return (
		<Container maxWidth="sm" className={classes.container}>
			<Typography>LOGIN</Typography>
			<TextField
				label="Username"
				name="username"
				value={username || ''}
				onChange={handleChange}
				disabled={isLoading}
			/>
			<TextField
				type="password"
				label="Password"
				name="password"
				value={password || ''}
				onChange={handleChange}
				disabled={isLoading}
			/>
			{error && (
				<Typography color="error" variant="caption" gutterBottom>{error}</Typography>
			)}
			<Button
				onClick={() => handleClick(user)}
				color="primary"
				variant="contained"
				disabled={isButtonDisabled || isLoading}
			>
				LOGIN
			</Button>
		</Container>
	)
}

export default Login;
