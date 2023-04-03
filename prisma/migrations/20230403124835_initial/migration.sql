-- CreateTable
CREATE TABLE `destinations` (
    `ID_DESTINATIONS` INTEGER NOT NULL AUTO_INCREMENT,
    `CSID_DESTINATIONS` VARCHAR(191) NOT NULL,
    `NAME_DESTINATIONS` VARCHAR(191) NOT NULL,
    `ID_EMP_DESTINATIONS` VARCHAR(191) NOT NULL,
    `IP_GATEWAY_DESTINATIONS` VARCHAR(191) NOT NULL,
    `STATUS_DESTINATIONS` VARCHAR(191) NOT NULL,
    `DT_CREATED` DATETIME(3) NOT NULL,
    `destination_equipmentID_DESTINATIONS` INTEGER NULL,

    UNIQUE INDEX `destinations_ID_DESTINATIONS_key`(`ID_DESTINATIONS`),
    PRIMARY KEY (`ID_DESTINATIONS`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `destination_equipment` (
    `ID_DESTINATIONS` INTEGER NOT NULL,
    `NAME_EQUIPAMEMENT` VARCHAR(191) NOT NULL,
    `PRODUCER_EQUIPAMEMENT` VARCHAR(191) NOT NULL,
    `MODEL_EQUIPAMENT` VARCHAR(191) NOT NULL,
    `HANDLE_HABILITY` VARCHAR(191) NOT NULL,
    `STATUS_EQUIPAMEMENT` VARCHAR(191) NOT NULL,
    `DT_EXECUTE` DATETIME(3) NOT NULL,

    UNIQUE INDEX `destination_equipment_ID_DESTINATIONS_key`(`ID_DESTINATIONS`),
    PRIMARY KEY (`ID_DESTINATIONS`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `destinations` ADD CONSTRAINT `destinations_destination_equipmentID_DESTINATIONS_fkey` FOREIGN KEY (`destination_equipmentID_DESTINATIONS`) REFERENCES `destination_equipment`(`ID_DESTINATIONS`) ON DELETE SET NULL ON UPDATE CASCADE;