import { PrismaClient } from "@prisma/client";
import { setPrisma } from "../src/db";

const { POSTGRES_USER, POSTGRES_PASSWORD } = process.env;
const TEST_DB = "app_test";
const DATABASE_URL_TEST = `postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@postgres:5432/${TEST_DB}`;

export const testClient = new PrismaClient({
	datasources: {
		db: {
			url: DATABASE_URL_TEST,
		},
	},
});

setPrisma(testClient);
