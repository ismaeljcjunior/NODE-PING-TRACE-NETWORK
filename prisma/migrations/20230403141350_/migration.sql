/*
  Warnings:

  - Added the required column `IP_EEQUIPAMEMENT` to the `destination_equipment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `destination_equipment` ADD COLUMN `IP_EEQUIPAMEMENT` VARCHAR(191) NOT NULL;
