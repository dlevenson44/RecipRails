class Validation {
	// validate username
	static validateUsername(username) {
		if (username.length < 3 || username.length > 20) return false;

		return true;
	}

	// validate password
	static validatePassword(password) {
		if (
			password.length >= 8 &&
			/[a-z]/.test(password) &&
			/[A-Z]/.test(password) &&
			/[\d]/.test(password)
		) return true;

		return false;
	};

	// confirm password and confirmPassword match
	static validateConfirmPassword(password, confirmPassword) {
		if (confirmPassword.length > 0 && password !== confirmPassword) return false;

		return true;
	};
};

export default Validation;