/*
  Warnings:

  - The primary key for the `APIKey` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `token` on the `APIKey` table. All the data in the column will be lost.
  - The primary key for the `Session` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `token` on the `Session` table. All the data in the column will be lost.
  - Added the required column `hashedKey` to the `APIKey` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hashedToken` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "APIKey" DROP CONSTRAINT "APIKey_pkey",
DROP COLUMN "token",
ADD COLUMN     "hashedKey" TEXT NOT NULL,
ADD CONSTRAINT "APIKey_pkey" PRIMARY KEY ("hashedKey");

-- AlterTable
ALTER TABLE "Session" DROP CONSTRAINT "Session_pkey",
DROP COLUMN "token",
ADD COLUMN     "hashedToken" TEXT NOT NULL,
ADD CONSTRAINT "Session_pkey" PRIMARY KEY ("hashedToken");
