/*
  Warnings:

  - Added the required column `immat` to the `appointment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `appointment` ADD COLUMN `immat` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE INDEX `Appointments_immat_fkey` ON `appointment`(`immat`);

-- AddForeignKey
ALTER TABLE `appointment` ADD CONSTRAINT `Appointment_immat_fkey` FOREIGN KEY (`immat`) REFERENCES `vehicules`(`immat`) ON DELETE RESTRICT ON UPDATE CASCADE;
