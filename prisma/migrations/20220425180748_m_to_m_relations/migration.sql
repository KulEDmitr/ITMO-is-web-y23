/*
  Warnings:

  - You are about to drop the `CategoryPicture` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CategoryPost` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CategoryPictureToPicture` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CategoryPostToPost` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `authorId` on table `Post` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Picture" DROP CONSTRAINT "Picture_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryPictureToPicture" DROP CONSTRAINT "_CategoryPictureToPicture_A_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryPictureToPicture" DROP CONSTRAINT "_CategoryPictureToPicture_B_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryPostToPost" DROP CONSTRAINT "_CategoryPostToPost_A_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryPostToPost" DROP CONSTRAINT "_CategoryPostToPost_B_fkey";

-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "authorId" SET NOT NULL;

-- DropTable
DROP TABLE "CategoryPicture";

-- DropTable
DROP TABLE "CategoryPost";

-- DropTable
DROP TABLE "_CategoryPictureToPicture";

-- DropTable
DROP TABLE "_CategoryPostToPost";

-- CreateTable
CREATE TABLE "CategoryOnPosts" (
    "id" SERIAL NOT NULL,
    "postId" INTEGER NOT NULL,
    "catId" INTEGER NOT NULL,

    CONSTRAINT "CategoryOnPosts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostCategory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "PostCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CategoryOnPictures" (
    "id" SERIAL NOT NULL,
    "picId" INTEGER,
    "catId" INTEGER,

    CONSTRAINT "CategoryOnPictures_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PictureCategory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "PictureCategory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PostCategory_name_key" ON "PostCategory"("name");

-- CreateIndex
CREATE UNIQUE INDEX "PictureCategory_name_key" ON "PictureCategory"("name");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryOnPosts" ADD CONSTRAINT "CategoryOnPosts_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryOnPosts" ADD CONSTRAINT "CategoryOnPosts_catId_fkey" FOREIGN KEY ("catId") REFERENCES "PostCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Picture" ADD CONSTRAINT "Picture_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryOnPictures" ADD CONSTRAINT "CategoryOnPictures_picId_fkey" FOREIGN KEY ("picId") REFERENCES "Picture"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryOnPictures" ADD CONSTRAINT "CategoryOnPictures_catId_fkey" FOREIGN KEY ("catId") REFERENCES "PictureCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
