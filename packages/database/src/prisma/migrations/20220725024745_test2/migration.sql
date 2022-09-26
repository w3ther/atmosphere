/*
  Warnings:

  - Added the required column `userId` to the `weatherNode` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "weatherNode" ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "weatherNode" ADD CONSTRAINT "weatherNode_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
