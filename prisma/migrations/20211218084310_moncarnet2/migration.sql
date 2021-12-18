/*
  Warnings:

  - You are about to drop the `___myrelationtable` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[email]` on the table `pros` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name_type]` on the table `types` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `___myrelationtable` DROP FOREIGN KEY `___myrelationtable_ibfk_1`;

-- DropForeignKey
ALTER TABLE `___myrelationtable` DROP FOREIGN KEY `___myrelationtable_ibfk_2`;

-- DropTable
DROP TABLE `___myrelationtable`;

-- CreateTable
CREATE TABLE `_myrelationtable` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_myrelationtable_AB_unique`(`A`, `B`),
    INDEX `_myrelationtable_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `email_UNIQUE` ON `pros`(`email`);

-- CreateIndex
CREATE UNIQUE INDEX `name_type_UNIQUE` ON `types`(`name_type`);

-- AddForeignKey
ALTER TABLE `_myrelationtable` ADD FOREIGN KEY (`A`) REFERENCES `pros`(`id_pros`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_myrelationtable` ADD FOREIGN KEY (`B`) REFERENCES `users`(`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;
