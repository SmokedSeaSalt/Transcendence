/*
  Warnings:

  - You are about to drop the column `createdAt` on the `GameSession` table. All the data in the column will be lost.
  - You are about to drop the column `roomkey` on the `GameSession` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `GameSession` table. All the data in the column will be lost.
  - Made the column `startedAt` on table `GameSession` required. This step will fail if there are existing NULL values in that column.
  - Made the column `finishedAt` on table `GameSession` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "GameSession_roomkey_key";

-- AlterTable
ALTER TABLE "GameSession" DROP COLUMN "createdAt",
DROP COLUMN "roomkey",
DROP COLUMN "status",
ALTER COLUMN "startedAt" SET NOT NULL,
ALTER COLUMN "finishedAt" SET NOT NULL;

-- DropEnum
DROP TYPE "GameStatus";
