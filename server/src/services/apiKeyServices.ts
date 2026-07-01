import { randomBytes } from "node:crypto";
import bcrypt from "bcrypt";


// todo: generate API key at creation? or at the request of the user? should keys expire? keys should be encrypted in db.
// https://codesignal.com/learn/courses/api-key-authentication-security/lessons/api-key-generation-basics
export const generateApiKey = async (): Promise<{ key: string; keyHash: string }> => {
	const generatedBytes = randomBytes(32);
	const key = generatedBytes.toString('hex');

	// Hash the key for secure storage
	const keyHash = await bcrypt.hash(key, 12);

	// todo: maybe add prefix

	return { key, keyHash };
};