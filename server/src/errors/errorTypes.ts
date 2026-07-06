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
