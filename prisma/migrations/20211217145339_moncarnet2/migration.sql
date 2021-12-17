/*
  Warnings:

  - You are about to drop the `users_pros` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `users_pros` DROP FOREIGN KEY `fk_users_has_pros_pros1`;

-- DropForeignKey
ALTER TABLE `users_pros` DROP FOREIGN KEY `fk_users_has_pros_users1`;

-- DropTable
DROP TABLE `users_pros`;

-- CreateTable
CREATE TABLE `___myrelationtable` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `___myrelationtable_AB_unique`(`A`, `B`),
    INDEX `___myrelationtable_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `___myrelationtable` ADD FOREIGN KEY (`A`) REFERENCES `pros`(`id_pros`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `___myrelationtable` ADD FOREIGN KEY (`B`) REFERENCES `users`(`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;
