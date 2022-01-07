-- CreateTable
CREATE TABLE `Brand` (
    `id_brand` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(45) NULL,
    `name` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id_brand`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Models` (
    `id_model` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(45) NULL,
    `name` VARCHAR(100) NULL,
    `id_brand` INTEGER NOT NULL,

    PRIMARY KEY (`id_model`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pros` (
    `id_pros` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `hashedPassword` VARCHAR(255) NOT NULL,
    `address` TEXT NOT NULL,
    `postal_code` INTEGER NOT NULL,
    `city` VARCHAR(150) NOT NULL,
    `siret` VARCHAR(14) NOT NULL,
    `phone` VARCHAR(15) NOT NULL,

    UNIQUE INDEX `email_UNIQUE`(`email`),
    PRIMARY KEY (`id_pros`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Service_Book` (
    `id_service_book` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATE NOT NULL,
    `service` TEXT NOT NULL,
    `observations` TEXT NULL,
    `kilometrage` INTEGER NOT NULL,
    `url_invoice` MEDIUMTEXT NULL,
    `id_pros` INTEGER NOT NULL,
    `immat` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_service_book`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Types` (
    `id_type` INTEGER NOT NULL AUTO_INCREMENT,
    `name_type` VARCHAR(100) NOT NULL,

    UNIQUE INDEX `name_type_UNIQUE`(`name_type`),
    PRIMARY KEY (`id_type`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Users` (
    `id_user` INTEGER NOT NULL AUTO_INCREMENT,
    `firstname` VARCHAR(100) NOT NULL,
    `lastname` VARCHAR(100) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `hashedPassword` VARCHAR(255) NULL,
    `address` TEXT NOT NULL,
    `phone` VARCHAR(15) NOT NULL,
    `postal_code` INTEGER NOT NULL,
    `city` VARCHAR(150) NOT NULL,

    UNIQUE INDEX `email_UNIQUE`(`email`),
    PRIMARY KEY (`id_user`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Vehicules` (
    `immat` VARCHAR(15) NOT NULL,
    `registration_date` DATE NOT NULL,
    `url_vehiculeRegistration` MEDIUMTEXT NOT NULL,
    `id_modelId` INTEGER NOT NULL,
    `id_typeId` INTEGER NOT NULL,
    `id_userId` INTEGER NOT NULL,

    PRIMARY KEY (`immat`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Appointment` (
    `id_appointment` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `prosId` INTEGER NOT NULL,
    `date` DATETIME NOT NULL,
    `comment` MEDIUMTEXT NOT NULL,

    PRIMARY KEY (`id_appointment`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_prostousers` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_prostousers_AB_unique`(`A`, `B`),
    INDEX `_prostousers_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Models` ADD CONSTRAINT `Models_id_brand_fkey` FOREIGN KEY (`id_brand`) REFERENCES `Brand`(`id_brand`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Service_Book` ADD CONSTRAINT `Service_Book_id_pros_fkey` FOREIGN KEY (`id_pros`) REFERENCES `Pros`(`id_pros`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Service_Book` ADD CONSTRAINT `Service_Book_immat_fkey` FOREIGN KEY (`immat`) REFERENCES `Vehicules`(`immat`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Vehicules` ADD CONSTRAINT `Vehicules_id_modelId_fkey` FOREIGN KEY (`id_modelId`) REFERENCES `Models`(`id_model`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Vehicules` ADD CONSTRAINT `Vehicules_id_typeId_fkey` FOREIGN KEY (`id_typeId`) REFERENCES `Types`(`id_type`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Vehicules` ADD CONSTRAINT `Vehicules_id_userId_fkey` FOREIGN KEY (`id_userId`) REFERENCES `Users`(`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Appointment` ADD CONSTRAINT `Appointment_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Appointment` ADD CONSTRAINT `Appointment_prosId_fkey` FOREIGN KEY (`prosId`) REFERENCES `Pros`(`id_pros`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_prostousers` ADD FOREIGN KEY (`A`) REFERENCES `Pros`(`id_pros`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_prostousers` ADD FOREIGN KEY (`B`) REFERENCES `Users`(`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;
