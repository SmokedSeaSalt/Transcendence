const bcrypt = require('bcrypt');


export const generateApiKey = async (): Promise<string> => {
	// todo: generate API key at creation? or at the request of the user? should keys expire? keys should be encrypted in db.
	// https://codesignal.com/learn/courses/api-key-authentication-security/lessons/api-key-generation-basics
	return "secureKey";
};