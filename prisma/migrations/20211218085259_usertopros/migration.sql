/*
  Warnings:

  - You are about to drop the `_prostouser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_prostouser` DROP FOREIGN KEY `_prostouser_ibfk_1`;

-- DropForeignKey
ALTER TABLE `_prostouser` DROP FOREIGN KEY `_prostouser_ibfk_2`;

-- DropTable
DROP TABLE `_prostouser`;

-- CreateTable
CREATE TABLE `_UsersToPros` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_UsersToPros_AB_unique`(`A`, `B`),
    INDEX `_UsersToPros_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_UsersToPros` ADD FOREIGN KEY (`A`) REFERENCES `pros`(`id_pros`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_UsersToPros` ADD FOREIGN KEY (`B`) REFERENCES `users`(`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;
