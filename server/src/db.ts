import { PrismaClient } from "@prisma/client";

export let prisma = new PrismaClient();

//this is used in the tester to set the prisma client to a temporary test database
export function setPrisma(client: PrismaClient) {
	prisma = client;
}
