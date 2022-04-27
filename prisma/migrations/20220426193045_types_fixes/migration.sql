/*
  Warnings:

  - The primary key for the `CategoryOnPictures` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `CategoryOnPosts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[login]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Made the column `picId` on table `CategoryOnPictures` required. This step will fail if there are existing NULL values in that column.
  - Made the column `catId` on table `CategoryOnPictures` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `ownerId` to the `Picture` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `authorId` on the `Post` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `login` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `id` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Picture" DROP CONSTRAINT "Picture_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- AlterTable
ALTER TABLE "CategoryOnPictures" DROP CONSTRAINT "CategoryOnPictures_pkey",
ALTER COLUMN "picId" SET NOT NULL,
ALTER COLUMN "catId" SET NOT NULL,
ADD CONSTRAINT "CategoryOnPictures_pkey" PRIMARY KEY ("picId", "catId");

-- AlterTable
ALTER TABLE "CategoryOnPosts" DROP CONSTRAINT "CategoryOnPosts_pkey",
ADD CONSTRAINT "CategoryOnPosts_pkey" PRIMARY KEY ("postId", "catId");

-- AlterTable
ALTER TABLE "Picture" DROP COLUMN "ownerId",
ADD COLUMN     "ownerId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "authorId",
ADD COLUMN     "authorId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ADD COLUMN     "login" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_login_key" ON "User"("login");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Picture" ADD CONSTRAINT "Picture_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
