/*
  Warnings:

  - You are about to drop the `_myrelationtable` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_myrelationtable` DROP FOREIGN KEY `_myrelationtable_ibfk_1`;

-- DropForeignKey
ALTER TABLE `_myrelationtable` DROP FOREIGN KEY `_myrelationtable_ibfk_2`;

-- DropTable
DROP TABLE `_myrelationtable`;

-- CreateTable
CREATE TABLE `__prosToUser` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `__prosToUser_AB_unique`(`A`, `B`),
    INDEX `__prosToUser_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `__prosToUser` ADD FOREIGN KEY (`A`) REFERENCES `pros`(`id_pros`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `__prosToUser` ADD FOREIGN KEY (`B`) REFERENCES `users`(`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;
