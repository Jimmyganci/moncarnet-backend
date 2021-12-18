/*
  Warnings:

  - You are about to drop the `_userstopros` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_userstopros` DROP FOREIGN KEY `_userstopros_ibfk_1`;

-- DropForeignKey
ALTER TABLE `_userstopros` DROP FOREIGN KEY `_userstopros_ibfk_2`;

-- DropTable
DROP TABLE `_userstopros`;

-- CreateTable
CREATE TABLE `__ProsToUsers` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `__ProsToUsers_AB_unique`(`A`, `B`),
    INDEX `__ProsToUsers_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `__ProsToUsers` ADD FOREIGN KEY (`A`) REFERENCES `pros`(`id_pros`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `__ProsToUsers` ADD FOREIGN KEY (`B`) REFERENCES `users`(`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;
