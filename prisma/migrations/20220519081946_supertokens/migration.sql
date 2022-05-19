/*
  Warnings:

  - A unique constraint covering the columns `[superTokenId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `superTokenId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "superTokenId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_superTokenId_key" ON "User"("superTokenId");
