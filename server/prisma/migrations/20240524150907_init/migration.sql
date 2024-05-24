-- CreateTable
CREATE TABLE `Software` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `code` CHAR(50) NOT NULL,
    `icon` VARCHAR(191) NULL,
    `desc` TEXT NOT NULL,
    `status` TINYINT UNSIGNED NOT NULL DEFAULT 1,
    `link` VARCHAR(191) NULL,
    `authorId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Software_name_key`(`name`),
    UNIQUE INDEX `Software_code_key`(`code`),
    UNIQUE INDEX `Software_authorId_key`(`authorId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_RoleToSoftware` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_RoleToSoftware_AB_unique`(`A`, `B`),
    INDEX `_RoleToSoftware_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Software` ADD CONSTRAINT `Software_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_RoleToSoftware` ADD CONSTRAINT `_RoleToSoftware_A_fkey` FOREIGN KEY (`A`) REFERENCES `Role`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_RoleToSoftware` ADD CONSTRAINT `_RoleToSoftware_B_fkey` FOREIGN KEY (`B`) REFERENCES `Software`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
