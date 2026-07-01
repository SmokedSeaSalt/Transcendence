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