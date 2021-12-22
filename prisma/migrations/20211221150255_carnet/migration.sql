-- DropForeignKey
ALTER TABLE `vehicules` DROP FOREIGN KEY `vehicules_id_modelId_fkey`;

-- DropForeignKey
ALTER TABLE `vehicules` DROP FOREIGN KEY `vehicules_id_typeId_fkey`;

-- DropForeignKey
ALTER TABLE `vehicules` DROP FOREIGN KEY `vehicules_id_userId_fkey`;

-- AddForeignKey
ALTER TABLE `Vehicules` ADD CONSTRAINT `Vehicules_id_modelId_fkey` FOREIGN KEY (`id_modelId`) REFERENCES `Models`(`id_model`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Vehicules` ADD CONSTRAINT `Vehicules_id_typeId_fkey` FOREIGN KEY (`id_typeId`) REFERENCES `Types`(`id_type`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Vehicules` ADD CONSTRAINT `Vehicules_id_userId_fkey` FOREIGN KEY (`id_userId`) REFERENCES `Users`(`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;
