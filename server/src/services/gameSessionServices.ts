import type { GameResult, GameSession } from "@prisma/client";
import { text } from "stream/consumers";
import { prisma } from "../db.js";
import type { RoomData, userInfo } from "./roomStore.js";

const promptCharCount = (prompt: string[] | undefined) => {
	if (!prompt) return 0;
	let sum = 0;
	prompt.forEach((word: string) => {
		sum = +word.length;
	});
	return sum;
};

const calculateWpm = (wordCount: number, durationMs: number) => {
	
}

const getGameResults = (roomData: RoomData, promptCharCount: number) => {
	const promptWordCount = roomData.wordCount;
	const startedAt = roomData.startedAt;
	if (!startedAt || !promptWordCount) {
		return [];
	}
	const users: Record<string, userInfo> = roomData.users;

	return Object.values(users)
		.sort(
			(a, b) =>
				(a.finishedAt?.getTime() ?? Number.MAX_SAFE_INTEGER) -
				(b.finishedAt?.getTime() ?? Number.MAX_SAFE_INTEGER),
		)
		.map((player, index) => {
			const timeMs = player.finishedAt
				? player.finishedAt.getTime() - startedAt.getTime()
				: undefined;

			const minutes = timeMs !== undefined ? timeMs / 60_000 : undefined;

			return {
				score: 0,
				wpm: minutes ? promptWordCount / minutes : 0,
				cpm: minutes ? promptCharCount / minutes : 0,
				accuracy: 0,
				timeMs: timeMs ?? -1,
				placement: index + 1,
				finished: timeMs !== undefined,
				userId: player.userId,
			};
		});
};

export const saveGameSession = async (roomData: RoomData) => {
	const charCount = promptCharCount(roomData.prompt);
	const wordCount = roomData.wordCount ?? 0;
	const textPrompt = (roomData.prompt ?? []).join(" ");
	const startedAt = roomData.startedAt ?? new Date(Date.now());
	const finishedAt = roomData.finishedAt ?? new Date(Date.now());

	const results = getGameResults(roomData, charCount);

	const gameSession = await prisma.$transaction(async (tx) => {
		return tx.gameSession.create({
			data: {
				charCount: charCount,
				wordCount: wordCount,
				textPrompt: textPrompt,
				startedAt: startedAt,
				finishedAt: finishedAt,

				results: {
					create: [...results],
				},
				players: {
					connect: Object.values(roomData.users)
						.filter(
							(user): user is typeof user & { userId: number } =>
								user.userId !== undefined,
						)
						.map((user) => ({
							id: user.userId,
						})),
				},
			},
			include: {
				results: true,
			},
		});
	});
};
