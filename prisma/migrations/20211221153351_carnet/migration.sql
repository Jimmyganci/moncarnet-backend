-- DropForeignKey
ALTER TABLE `models` DROP FOREIGN KEY `fk_models_brands1`;

-- DropForeignKey
ALTER TABLE `service_book` DROP FOREIGN KEY `fk_service_book_pros1`;

-- DropIndex
DROP INDEX `fk_service_book_vehicules1_idx` ON `service_book`;

-- AddForeignKey
ALTER TABLE `Models` ADD CONSTRAINT `Models_id_brand_fkey` FOREIGN KEY (`id_brand`) REFERENCES `Brand`(`id_brand`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Service_Book` ADD CONSTRAINT `Service_Book_pros_id_pros_fkey` FOREIGN KEY (`pros_id_pros`) REFERENCES `Pros`(`id_pros`) ON DELETE RESTRICT ON UPDATE CASCADE;
