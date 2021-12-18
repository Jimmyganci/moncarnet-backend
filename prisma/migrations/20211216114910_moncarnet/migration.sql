-- CreateTable
CREATE TABLE `brand` (
    `id_brand` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(45) NULL,
    `name` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id_brand`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `models` (
    `id_model` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(45) NULL,
    `name` VARCHAR(100) NULL,
    `id_brand` INTEGER NOT NULL,

    INDEX `fk_models_brands1_idx`(`id_brand`),
    PRIMARY KEY (`id_model`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pros` (
    `id_pros` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `hashedPassword` VARCHAR(255) NOT NULL,
    `adress` TEXT NOT NULL,
    `postal_code` INTEGER NOT NULL,
    `city` VARCHAR(150) NOT NULL,
    `siret` INTEGER NOT NULL,
    `phone` VARCHAR(15) NOT NULL,

    PRIMARY KEY (`id_pros`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `service_book` (
    `id_service_book` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATE NOT NULL,
    `service` TEXT NOT NULL,
    `observations` TEXT NULL,
    `pros_id_pros` INTEGER NOT NULL,
    `kilometrage` INTEGER NOT NULL,
    `url_invoice` MEDIUMTEXT NULL,
    `vehicules_immat` VARCHAR(15) NOT NULL,

    INDEX `fk_service_book_pros1_idx`(`pros_id_pros`),
    INDEX `fk_service_book_vehicules1_idx`(`vehicules_immat`),
    PRIMARY KEY (`id_service_book`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `types` (
    `id_type` INTEGER NOT NULL AUTO_INCREMENT,
    `name_type` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id_type`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
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
CREATE TABLE `users_pros` (
    `user_id_user` INTEGER NOT NULL,
    `pros_id_pros` INTEGER NOT NULL,

    INDEX `fk_users_has_pros_pros1_idx`(`pros_id_pros`),
    INDEX `fk_users_has_pros_users1_idx`(`user_id_user`),
    PRIMARY KEY (`user_id_user`, `pros_id_pros`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `vehicules` (
    `immat` VARCHAR(15) NOT NULL,
    `registration_date` DATE NOT NULL,
    `model_id_model` INTEGER NOT NULL,
    `user_id_user` INTEGER NULL,
    `types_id_type` INTEGER NOT NULL,
    `url_vehiculeRegistration` MEDIUMTEXT NOT NULL,

    INDEX `fk_cars_models_idx`(`model_id_model`),
    INDEX `fk_cars_users1_idx`(`user_id_user`),
    INDEX `fk_vehicules_types1_idx`(`types_id_type`),
    PRIMARY KEY (`immat`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `models` ADD CONSTRAINT `fk_models_brands1` FOREIGN KEY (`id_brand`) REFERENCES `brand`(`id_brand`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `service_book` ADD CONSTRAINT `fk_service_book_pros1` FOREIGN KEY (`pros_id_pros`) REFERENCES `pros`(`id_pros`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `users_pros` ADD CONSTRAINT `fk_users_has_pros_pros1` FOREIGN KEY (`pros_id_pros`) REFERENCES `pros`(`id_pros`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `users_pros` ADD CONSTRAINT `fk_users_has_pros_users1` FOREIGN KEY (`user_id_user`) REFERENCES `users`(`id_user`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `vehicules` ADD CONSTRAINT `fk_cars_models` FOREIGN KEY (`model_id_model`) REFERENCES `models`(`id_model`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `vehicules` ADD CONSTRAINT `fk_vehicules_types1` FOREIGN KEY (`types_id_type`) REFERENCES `types`(`id_type`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `vehicules` ADD CONSTRAINT `fk_cars_users1` FOREIGN KEY (`user_id_user`) REFERENCES `users`(`id_user`) ON DELETE NO ACTION ON UPDATE NO ACTION;
