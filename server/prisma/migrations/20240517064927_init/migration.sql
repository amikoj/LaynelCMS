/*
  Warnings:

  - You are about to drop the column `key` on the `permissions` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Permissions_key_key` ON `permissions`;

-- AlterTable
ALTER TABLE `permissions` DROP COLUMN `key`;
