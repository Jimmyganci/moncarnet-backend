/*
  Warnings:

  - You are about to drop the `_modelstovehicules` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_typestovehicules` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_userstovehicules` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `id_modelId` to the `vehicules` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_typeId` to the `vehicules` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_userId` to the `vehicules` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_modelstovehicules` DROP FOREIGN KEY `_modelstovehicules_ibfk_1`;

-- DropForeignKey
ALTER TABLE `_modelstovehicules` DROP FOREIGN KEY `_modelstovehicules_ibfk_2`;

-- DropForeignKey
ALTER TABLE `_typestovehicules` DROP FOREIGN KEY `_typestovehicules_ibfk_1`;

-- DropForeignKey
ALTER TABLE `_typestovehicules` DROP FOREIGN KEY `_typestovehicules_ibfk_2`;

-- DropForeignKey
ALTER TABLE `_userstovehicules` DROP FOREIGN KEY `_userstovehicules_ibfk_1`;

-- DropForeignKey
ALTER TABLE `_userstovehicules` DROP FOREIGN KEY `_userstovehicules_ibfk_2`;

-- AlterTable
ALTER TABLE `vehicules` ADD COLUMN `id_modelId` INTEGER NOT NULL,
    ADD COLUMN `id_typeId` INTEGER NOT NULL,
    ADD COLUMN `id_userId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `_modelstovehicules`;

-- DropTable
DROP TABLE `_typestovehicules`;

-- DropTable
DROP TABLE `_userstovehicules`;

-- AddForeignKey
ALTER TABLE `vehicules` ADD CONSTRAINT `vehicules_id_userId_fkey` FOREIGN KEY (`id_userId`) REFERENCES `users`(`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `vehicules` ADD CONSTRAINT `vehicules_id_modelId_fkey` FOREIGN KEY (`id_modelId`) REFERENCES `models`(`id_model`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `vehicules` ADD CONSTRAINT `vehicules_id_typeId_fkey` FOREIGN KEY (`id_typeId`) REFERENCES `types`(`id_type`) ON DELETE RESTRICT ON UPDATE CASCADE;
