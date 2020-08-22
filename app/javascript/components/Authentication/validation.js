class Validation {
	// validate username
	static validateUsername(username) {
		if (!!username.length && (username.length < 3 || username.length > 20)) return true;

		return false;
	}

	// validate password
	static validatePassword(password) {
		if (
			password.length > 0 &&
			!(password.length >= 8 &&
			/[a-z]/.test(password) &&
			/[A-Z]/.test(password) &&
			/[\d]/.test(password))
		) return true;

		return false;
	};

	// confirm password and confirmPassword match
	static validateConfirmPassword(password, confirmPassword) {
		if (!!confirmPassword.length && password !== confirmPassword) return true;

		return false;
	};

	// confirm email has @ and . characters
	static validateEmail(email) {
		if (/\S+@\S+\.\S+/.test(email) || !email.length) return false;

		return true;
	}

	static isFormValid(username, password, confirmPassword, email, name) {
		const isUsernameValid = !this.validateUsername(username);
		const isPasswordValid = !this.validatePassword(password);
		const isConfirmPasswordValid = !this.validateConfirmPassword(password, confirmPassword);
		const isEmailValid = !this.validateEmail(email);
		const isNameValid = !!name.length;
		
		// Return error if any field is invalid
		if (!(isUsernameValid &&
					isPasswordValid &&
					isConfirmPasswordValid &&
					isEmailValid &&
					isNameValid)
		) return true;

		// Return error if any field is empty
		if (
			!username.length ||
			!password.length ||
			!confirmPassword.length ||
			!email.length ||
			!name.length
		) return true;

		return false;
	};
};

export default Validation;