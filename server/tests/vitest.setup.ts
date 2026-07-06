import { execSync } from "child_process";
import { PrismaClient } from "@prisma/client";

const { POSTGRES_USER, POSTGRES_PASSWORD } = process.env;
const TEST_DB = "app_test";
const DATABASE_URL_TEST = `postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@postgres:5432/${TEST_DB}`;
const DATABASE_URL_ADMIN = `postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@postgres:5432/postgres`;

const adminClient = new PrismaClient({
	datasources: { db: { url: DATABASE_URL_ADMIN } },
});

export const testClient = new PrismaClient({
	datasources: { db: { url: DATABASE_URL_TEST } },
});

export async function setup() {
	await adminClient.$executeRawUnsafe(`DROP DATABASE IF EXISTS ${TEST_DB};`);
	await adminClient.$executeRawUnsafe(`CREATE DATABASE ${TEST_DB};`);
	// await adminClient.$disconnect();

	execSync("npm run prisma:migrate:deploy", {
		env: {
			...process.env,
			DATABASE_URL: DATABASE_URL_TEST,
		},
	});

	process.env.DATABASE_URL = DATABASE_URL_TEST;
}

export async function teardown() {
	// const adminClient = new PrismaClient({
	//   datasources: { db: { url: DATABASE_URL_ADMIN } },
	// });

	await adminClient.$executeRawUnsafe(`DROP DATABASE IF EXISTS ${TEST_DB};`);
	console.log(`database ${TEST_DB} deleted`);
	await adminClient.$disconnect();
}
