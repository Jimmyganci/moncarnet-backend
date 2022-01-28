/*
  Warnings:

  - You are about to alter the column `date` on the `appointment` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `appointment` MODIFY `date` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `active` BOOLEAN NOT NULL DEFAULT true;
