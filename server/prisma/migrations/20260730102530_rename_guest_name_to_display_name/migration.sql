/*
  Warnings:

  - You are about to drop the column `guestName` on the `GameResult` table. All the data in the column will be lost.
  - Added the required column `displayName` to the `GameResult` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GameResult" DROP COLUMN "guestName",
ADD COLUMN     "displayName" TEXT NOT NULL;
