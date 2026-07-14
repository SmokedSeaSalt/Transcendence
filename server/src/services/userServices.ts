import type { User } from "@prisma/client";
import bcrypt from "bcrypt";
import { prisma } from "../db.js";
import {
	EmailAlreadyExistsError,
	HashError,
	LoginInvalidCredentialsError,
	PasswordValidationError,
} from "../errors/errorTypes.js";
import { createHash } from "node:crypto";

//////////////////////////////////
// Login ////////////////////////
////////////////////////////////
export const authenticateUser = async (
	email: string,
	unhashedPassword: string,
): Promise<User> => {
	const user = await prisma.user.findUnique({
		where: { email },
	});
	if (!user) {
		throw new LoginInvalidCredentialsError("Invalid credentials");
	}

	const validPassword = await bcrypt.compare(
		unhashedPassword,
		user.hashedPassword,
	);
	if (!validPassword) {
		throw new LoginInvalidCredentialsError("Invalid credentials");
	}
	return user;
};

///////////////////////////////////////
// Signup ////////////////////////////
/////////////////////////////////////
export const createUser = async (
	email: string,
	name: string,
	unhashedPassword: string,
) => {
	const [hashedPassword, emailExists] = await Promise.all([
		hashPassword(unhashedPassword),
		emailAlreadyExists(email),
	]);

	if (emailExists) {
		throw new EmailAlreadyExistsError("User already exists with this email.");
	}

	const newUser = await prisma.user.create({
		data: {
			email: email,
			name: name,
			hashedPassword: hashedPassword,
		},
	});
	return newUser;
};

const hashPassword = async (password: string): Promise<string> => {
	const saltRounds: number = 10;
	if (typeof password !== "string" || password.length === 0) {
		throw new PasswordValidationError("Password is required");
	}
	try {
		const hash = await bcrypt.hash(password, saltRounds);
		return hash;
	} catch (err) {
		console.error("Failed to hash password:", err);
		throw new HashError("bcyrpt.hash() failed to hash password");
	}
};

const emailAlreadyExists = async (userInputEmail: string): Promise<boolean> => {
	const user = await prisma.user.findUnique({
		where: { email: userInputEmail },
	});

	return !!user;
};

// returns the user object based on sessionToken, or null.
export const getUserFromSession = async (sessionToken: BinaryLike) => {
	const sessionHashedToken = createHash("sha256").update(sessionToken).digest("hex");
	try
	{
		const sessionWithUser = await prisma.session.findUnique({
			where: { hashedToken: sessionHashedToken },
			include: { user: true }
		});
		if (sessionWithUser == null)
		{
			console.log("getUserFromSession: user null");
			return null;
		}
		return sessionWithUser.user;
	}
	catch
	{
		// todo: throw error
		console.log("getUserFromSession: threw error searching prisma sessions");
		return null;
	}
};
