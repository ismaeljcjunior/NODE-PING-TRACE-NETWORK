/*
  Warnings:

  - You are about to drop the column `CONTATOR_OFF` on the `host` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `host` DROP COLUMN `CONTATOR_OFF`,
    ADD COLUMN `CONTADOR_OFF` INTEGER NULL DEFAULT 0;
