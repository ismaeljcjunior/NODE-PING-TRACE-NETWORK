/*
  Warnings:

  - You are about to drop the column `destination_equipmentID_DESTINATIONS` on the `destinations` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `destinations` DROP FOREIGN KEY `destinations_destination_equipmentID_DESTINATIONS_fkey`;

-- AlterTable
ALTER TABLE `destinations` DROP COLUMN `destination_equipmentID_DESTINATIONS`;
