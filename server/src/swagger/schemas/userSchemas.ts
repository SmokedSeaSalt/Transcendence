export const userSchemas = {
	// E.g This user schema will be sent in signup response.body
	User: {
		type: "object",

		properties: {
			id: {
				type: "string",
				example: "clx123abc",
			},

			email: {
				type: "string",
				format: "email",
				example: "john@example.com",
			},

			name: {
				type: "string",
				example: "John Smith",
			},

			createdAt: {
				type: "string",
				format: "date-time",
			},
		},

		required: [
			"id",
			"email",
			"name",
			"createdAt",
		],
	},


	// POST /users/register
	CreateUserRequest: {
		type: "object",

		properties: {
			email: {
				type: "string",
				format: "email",
				example: "john@example.com",
			},

			name: {
				type: "string",
				example: "John Smith",
			},

			password: {
				type: "string",
				format: "password",
				example: "secret123",
			},
		},

		required: [
			"email",
			"name",
			"password",
		],
	},


};