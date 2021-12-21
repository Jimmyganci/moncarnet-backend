-- DropForeignKey
ALTER TABLE `vehicules` DROP FOREIGN KEY `fk_cars_models`;

-- DropForeignKey
ALTER TABLE `vehicules` DROP FOREIGN KEY `fk_vehicules_types1`;

-- DropForeignKey
ALTER TABLE `vehicules` DROP FOREIGN KEY `fk_cars_users1`;

-- CreateTable
CREATE TABLE `_modelsTovehicules` (
    `A` INTEGER NOT NULL,
    `B` VARCHAR(15) NOT NULL,

    UNIQUE INDEX `_modelsTovehicules_AB_unique`(`A`, `B`),
    INDEX `_modelsTovehicules_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_typesTovehicules` (
    `A` INTEGER NOT NULL,
    `B` VARCHAR(15) NOT NULL,

    UNIQUE INDEX `_typesTovehicules_AB_unique`(`A`, `B`),
    INDEX `_typesTovehicules_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_usersTovehicules` (
    `A` INTEGER NOT NULL,
    `B` VARCHAR(15) NOT NULL,

    UNIQUE INDEX `_usersTovehicules_AB_unique`(`A`, `B`),
    INDEX `_usersTovehicules_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_modelsTovehicules` ADD FOREIGN KEY (`A`) REFERENCES `models`(`id_model`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_modelsTovehicules` ADD FOREIGN KEY (`B`) REFERENCES `vehicules`(`immat`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_typesTovehicules` ADD FOREIGN KEY (`A`) REFERENCES `types`(`id_type`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_typesTovehicules` ADD FOREIGN KEY (`B`) REFERENCES `vehicules`(`immat`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_usersTovehicules` ADD FOREIGN KEY (`A`) REFERENCES `users`(`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_usersTovehicules` ADD FOREIGN KEY (`B`) REFERENCES `vehicules`(`immat`) ON DELETE CASCADE ON UPDATE CASCADE;
