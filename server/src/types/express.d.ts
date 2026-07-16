// Custom type to be able to set req.user. This is required in ts because express Request type doesn't have .user.
export interface AuthUser {
	id: number;
	email: string;
	role: string;
	hashedApiKey: string
}

declare global {
	namespace Express {
		interface Request {
			user?: AuthUser;
		}
	}
}

export {};