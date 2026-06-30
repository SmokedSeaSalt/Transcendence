import express from "express";
import { prisma } from "./db.js";

export const app = express();

app.get("/server/hello", async (_req, res) => {
	//get test user name to respond
	const user = await prisma.user.findFirst();
	res.send(`hello ${user?.name ?? "nobody"}`);
});