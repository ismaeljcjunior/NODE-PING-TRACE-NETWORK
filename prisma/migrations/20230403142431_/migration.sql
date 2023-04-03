/*
  Warnings:

  - The primary key for the `destination_equipment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `IP_EEQUIPAMEMENT` on the `destination_equipment` table. All the data in the column will be lost.
  - You are about to drop the column `MODEL_EQUIPAMENT` on the `destination_equipment` table. All the data in the column will be lost.
  - You are about to drop the column `NAME_EQUIPAMEMENT` on the `destination_equipment` table. All the data in the column will be lost.
  - You are about to drop the column `PRODUCER_EQUIPAMEMENT` on the `destination_equipment` table. All the data in the column will be lost.
  - You are about to drop the column `STATUS_EQUIPAMEMENT` on the `destination_equipment` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[ID_EQUIPMENT]` on the table `destination_equipment` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ID_EQUIPMENT` to the `destination_equipment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `IP_EQUIPMENT` to the `destination_equipment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `MODEL_EQUIPMENT` to the `destination_equipment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `NAME_EQUIPMENT` to the `destination_equipment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `PRODUCER_EQUIPMENT` to the `destination_equipment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `STATUS_EQUIPMENT` to the `destination_equipment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `destination_equipment` DROP PRIMARY KEY,
    DROP COLUMN `IP_EEQUIPAMEMENT`,
    DROP COLUMN `MODEL_EQUIPAMENT`,
    DROP COLUMN `NAME_EQUIPAMEMENT`,
    DROP COLUMN `PRODUCER_EQUIPAMEMENT`,
    DROP COLUMN `STATUS_EQUIPAMEMENT`,
    ADD COLUMN `ID_EQUIPMENT` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `IP_EQUIPMENT` VARCHAR(191) NOT NULL,
    ADD COLUMN `MODEL_EQUIPMENT` VARCHAR(191) NOT NULL,
    ADD COLUMN `NAME_EQUIPMENT` VARCHAR(191) NOT NULL,
    ADD COLUMN `PRODUCER_EQUIPMENT` VARCHAR(191) NOT NULL,
    ADD COLUMN `STATUS_EQUIPMENT` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`ID_EQUIPMENT`);

-- CreateIndex
CREATE UNIQUE INDEX `destination_equipment_ID_EQUIPMENT_key` ON `destination_equipment`(`ID_EQUIPMENT`);

-- AddForeignKey
ALTER TABLE `destination_equipment` ADD CONSTRAINT `destination_equipment_ID_DESTINATIONS_fkey` FOREIGN KEY (`ID_DESTINATIONS`) REFERENCES `destinations`(`ID_DESTINATIONS`) ON DELETE RESTRICT ON UPDATE CASCADE;
