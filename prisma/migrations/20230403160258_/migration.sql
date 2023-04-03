/*
  Warnings:

  - You are about to drop the `destination_equipment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `destinations` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `destination_equipment` DROP FOREIGN KEY `destination_equipment_ID_DESTINATIONS_fkey`;

-- DropTable
DROP TABLE `destination_equipment`;

-- DropTable
DROP TABLE `destinations`;

-- CreateTable
CREATE TABLE `host` (
    `ID_HOST` INTEGER NOT NULL AUTO_INCREMENT,
    `CSID_HOST` VARCHAR(191) NOT NULL,
    `NAME_HOST` VARCHAR(191) NOT NULL,
    `ID_EMP_HOST` VARCHAR(191) NOT NULL,
    `IP_GATEWAY_HOST` VARCHAR(191) NOT NULL,
    `STATUS_HOST` VARCHAR(191) NOT NULL,
    `DT_CREATED` DATETIME(3) NOT NULL,

    UNIQUE INDEX `host_ID_HOST_key`(`ID_HOST`),
    UNIQUE INDEX `host_CSID_HOST_key`(`CSID_HOST`),
    PRIMARY KEY (`ID_HOST`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `host_equipment` (
    `ID_EQUIPMENT` INTEGER NOT NULL AUTO_INCREMENT,
    `NAME_EQUIPMENT` VARCHAR(191) NOT NULL,
    `PRODUCER_EQUIPMENT` VARCHAR(191) NOT NULL,
    `MODEL_EQUIPMENT` VARCHAR(191) NOT NULL,
    `HANDLE_HABILITY` VARCHAR(191) NOT NULL,
    `IP_EQUIPMENT` VARCHAR(191) NOT NULL,
    `STATUS_EQUIPMENT` VARCHAR(191) NOT NULL,
    `DT_EXECUTE` DATETIME(3) NOT NULL,
    `CSID_HOST` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `host_equipment_ID_EQUIPMENT_key`(`ID_EQUIPMENT`),
    PRIMARY KEY (`ID_EQUIPMENT`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `host_equipment` ADD CONSTRAINT `host_equipment_CSID_HOST_fkey` FOREIGN KEY (`CSID_HOST`) REFERENCES `host`(`CSID_HOST`) ON DELETE RESTRICT ON UPDATE CASCADE;
