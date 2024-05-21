/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `Role` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `Role` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `role` ADD COLUMN `code` VARCHAR(191) NOT NULL,
    ADD COLUMN `sort` INTEGER NOT NULL DEFAULT 1,
    ADD COLUMN `status` INTEGER NOT NULL DEFAULT 1;

-- CreateIndex
CREATE UNIQUE INDEX `Role_code_key` ON `Role`(`code`);
