export class PasswordValidationError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "PasswordValidationError";
	}
}

export class HashError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "HashError";
	}
}

export class InvalidEmailError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "InvalidEmailError";
	}
}

export class EmailAlreadyExistsError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "EmailAlreadyExistsError";
	}
}

export class LoginInvalidCredentialsError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "LoginInvalidCredentialsError";
	}
}

export class UnauthorizedError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "UnauthorizedError";
	}
}

export class ForbiddenError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "ForbiddenError";
	}
}

export class NotFoundError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "NotFoundError";
	}
}
