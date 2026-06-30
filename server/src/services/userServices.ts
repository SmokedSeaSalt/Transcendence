import { prisma } from "../db.js";

export const getFirstUser = async () => {
	return await prisma.user.findFirst();
};

const hashPassword = async (password: string): Promise<string> => {
	// todo
	return password;
};

const generateApiKey = async (): Promise<string> => {
	// todo: generate API key at creation? or at the request of the user? should keys expire? keys should be encrypted in db.
	// https://codesignal.com/learn/courses/api-key-authentication-security/lessons/api-key-generation-basics
	return "secureKey";
};


export const createUser = async ( email: string, name: string, unhashedPassword: string ) => {
	const [hashedPassword, apiKey] = await Promise.all([
		hashPassword(unhashedPassword),
		generateApiKey()
	]);
	const newUser = await prisma.user.create({
		data: {
			email: email,
			name: name,
			hashedPassword: hashedPassword,
			apiKey: apiKey
		}
	});


	return newUser;
};
