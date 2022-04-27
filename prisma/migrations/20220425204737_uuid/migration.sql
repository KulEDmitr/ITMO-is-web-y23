/*
  Warnings:

  - The primary key for the `CategoryOnPictures` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `CategoryOnPosts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `title` on the `Picture` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `name` on the `PictureCategory` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `title` on the `Post` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `name` on the `PostCategory` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `name` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - A unique constraint covering the columns `[login]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Made the column `picId` on table `CategoryOnPictures` required. This step will fail if there are existing NULL values in that column.
  - Made the column `catId` on table `CategoryOnPictures` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `ownerId` to the `Picture` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `authorId` on the `Post` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `login` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

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
ALTER TABLE "Picture" ALTER COLUMN "title" SET DATA TYPE VARCHAR(255),
DROP COLUMN "ownerId",
ADD COLUMN     "ownerId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "PictureCategory" ALTER COLUMN "name" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "title" SET DATA TYPE VARCHAR(255),
DROP COLUMN "authorId",
ADD COLUMN     "authorId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "PostCategory" ALTER COLUMN "name" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ADD COLUMN     "login" VARCHAR(255) NOT NULL,
ADD COLUMN     "password" VARCHAR(255) NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "name" SET DATA TYPE VARCHAR(255),
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- CreateIndex
CREATE UNIQUE INDEX "User_login_key" ON "User"("login");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Picture" ADD CONSTRAINT "Picture_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
