/*
  Warnings:

  - A unique constraint covering the columns `[nick]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `nick` VARCHAR(191) NULL,
    ADD COLUMN `password` VARCHAR(191) NOT NULL DEFAULT 'Aa111111',
    MODIFY `gender` INTEGER NOT NULL DEFAULT 1;

-- CreateIndex
CREATE UNIQUE INDEX `User_nick_key` ON `User`(`nick`);
