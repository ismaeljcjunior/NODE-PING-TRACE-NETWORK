/*
  Warnings:

  - You are about to drop the column `ID_EMPRESA__EVENTO` on the `event_host` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `event_host` DROP COLUMN `ID_EMPRESA__EVENTO`,
    ADD COLUMN `ID_EMPRESA_EVENTO` VARCHAR(50) NULL;
