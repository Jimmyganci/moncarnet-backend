/*
  Warnings:

  - You are about to alter the column `date` on the `appointment` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `appointment` MODIFY `date` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `vehicules` ADD COLUMN `active` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `validate` BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE `Admin` (
    `id_admin` INTEGER NOT NULL AUTO_INCREMENT,
    `firstname` VARCHAR(100) NOT NULL,
    `lastname` VARCHAR(100) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `hashedPassword` VARCHAR(255) NULL,

    UNIQUE INDEX `email_UNIQUE`(`email`),
    PRIMARY KEY (`id_admin`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
