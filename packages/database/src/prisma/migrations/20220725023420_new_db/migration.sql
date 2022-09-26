/*
  Warnings:

  - You are about to drop the column `collectionId` on the `weatherNode` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `weatherNode` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "weatherNode" DROP CONSTRAINT "weatherNode_collectionId_fkey";

-- DropForeignKey
ALTER TABLE "weatherNode" DROP CONSTRAINT "weatherNode_userId_fkey";

-- AlterTable
ALTER TABLE "weatherNode" DROP COLUMN "collectionId",
DROP COLUMN "userId";
