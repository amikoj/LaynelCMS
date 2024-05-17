/*
  Warnings:

  - Added the required column `title` to the `Permissions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `permissions` ADD COLUMN `component` VARCHAR(191) NULL,
    ADD COLUMN `hidden` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `icon` VARCHAR(191) NULL,
    ADD COLUMN `redirect` VARCHAR(191) NULL,
    ADD COLUMN `title` VARCHAR(191) NOT NULL;
