/*
  Warnings:

  - You are about to drop the column `model_id_model` on the `vehicules` table. All the data in the column will be lost.
  - You are about to drop the column `types_id_type` on the `vehicules` table. All the data in the column will be lost.
  - You are about to drop the column `user_id_user` on the `vehicules` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `vehicules` DROP COLUMN `model_id_model`,
    DROP COLUMN `types_id_type`,
    DROP COLUMN `user_id_user`;
