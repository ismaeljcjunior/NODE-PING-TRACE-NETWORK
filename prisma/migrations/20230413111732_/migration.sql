-- AlterTable
ALTER TABLE `host` ADD COLUMN `PARTITION_HOST` VARCHAR(191) NULL,
    ADD COLUMN `ZONE_HOST` VARCHAR(191) NULL,
    MODIFY `DT_CREATED` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3);
