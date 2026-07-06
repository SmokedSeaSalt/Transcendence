import bcrypt from "bcrypt";
import { prisma } from "../db.js";
import {
	EmailAlreadyExistsError,
	HashError,
	PasswordValidationError,
} from "../errors/errorTypes.js";
import { generateApiKey } from "./apiKeyServices.js";

export const getFirstUser = async () => {
	return await prisma.user.findFirst();
};

//////////////////////////////////
// Login ////////////////////////
////////////////////////////////
export const authenticateUser = async (
	email: string,
	unhashedPassword: string,
) => {
	const user = await prisma.user.findUnique({
		where: { email },
		select: {
			id: true,
			email: true,
			hashedPassword: true,
		},
	});

	if (!user) {
	}

	const hashedPassword = await getUserPassword(user.id);
	// todo do bycrpt comapre()
	const newUser = await prisma.user.create({
		data: {
			email: email,
			hashedPassword: hashedPassword,
		},
	});
	return newUser;
};

const getUserPassword = async (userId: number): Promise<string | null> => {
	const user = await prisma.user.findUnique({
		where: { id: userId },
		select: { hashedPassword: true },
	});

	return user?.hashedPassword ?? null;
};

const verifyPassword = async (
	userId: number,
	userInputPassword: string,
): Promise<boolean> => {
	const userHashedPassword = await getUserPassword(userId);
	return await bcrypt.compare(userInputPassword, userHashedPassword);
};

///////////////////////////////////////
// Signup ////////////////////////////
/////////////////////////////////////

export const createUser = async (
	email: string,
	name: string,
	unhashedPassword: string,
) => {
	const [hashedPassword, apiKey, emailExists] = await Promise.all([
		hashPassword(unhashedPassword),
		generateApiKey(),
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
			apiKey: apiKey.keyHash,
		},
	});
	// todo still send apiKey.key back to client
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

	return user ? true : false;
};
