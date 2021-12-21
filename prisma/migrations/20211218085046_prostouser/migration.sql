/*
  Warnings:

  - You are about to drop the `__prostouser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `__prostouser` DROP FOREIGN KEY `__prostouser_ibfk_1`;

-- DropForeignKey
ALTER TABLE `__prostouser` DROP FOREIGN KEY `__prostouser_ibfk_2`;

-- DropTable
DROP TABLE `__prostouser`;

-- CreateTable
CREATE TABLE `_prosToUser` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_prosToUser_AB_unique`(`A`, `B`),
    INDEX `_prosToUser_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_prosToUser` ADD FOREIGN KEY (`A`) REFERENCES `pros`(`id_pros`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_prosToUser` ADD FOREIGN KEY (`B`) REFERENCES `users`(`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;
