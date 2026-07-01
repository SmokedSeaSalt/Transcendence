import { prisma } from "../db.js";
import { generateApiKey } from "./apiKeyServices.js";
import { PasswordValidationError, HashError} from "../errors/errorTypes.js"
const bcrypt = require('bcrypt');



export const getFirstUser = async () => {
	return await prisma.user.findFirst();
};

const getUserPassword = async (userId: number): Promise<string | null> => {
	const user = await prisma.user.findUnique({
		where: { id: userId },
		select: { hashedPassword: true },
	});

	return user?.hashedPassword ?? null;
};

const verifyPassword = async (userInputPassword: string): Promise<boolean> => {

	const userHashedPassword = await getUserPassword()
	bcrypt.compare(userInputPassword, userHashedPassword);
	return true;
}


const hashPassword = async (password: string): Promise<string> => {
	const saltRounds = 10;
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
