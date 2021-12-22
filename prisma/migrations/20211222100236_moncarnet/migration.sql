/*
  Warnings:

  - You are about to drop the column `pros_id_pros` on the `service_book` table. All the data in the column will be lost.
  - You are about to drop the column `vehicules_immat` on the `service_book` table. All the data in the column will be lost.
  - Added the required column `id_pros` to the `Service_Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `immat` to the `Service_Book` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `service_book` DROP FOREIGN KEY `Service_Book_pros_id_pros_fkey`;

-- AlterTable
ALTER TABLE `pros` MODIFY `siret` VARCHAR(14) NOT NULL;

-- AlterTable
ALTER TABLE `service_book` DROP COLUMN `pros_id_pros`,
    DROP COLUMN `vehicules_immat`,
    ADD COLUMN `id_pros` INTEGER NOT NULL,
    ADD COLUMN `immat` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Service_Book` ADD CONSTRAINT `Service_Book_id_pros_fkey` FOREIGN KEY (`id_pros`) REFERENCES `Pros`(`id_pros`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Service_Book` ADD CONSTRAINT `Service_Book_immat_fkey` FOREIGN KEY (`immat`) REFERENCES `Vehicules`(`immat`) ON DELETE RESTRICT ON UPDATE CASCADE;
