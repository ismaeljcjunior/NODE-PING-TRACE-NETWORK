/*
  Warnings:

  - A unique constraint covering the columns `[ENDERECO_IP]` on the table `equipamento` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[ENDERECO_IP]` on the table `ping` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `equipamento` ADD COLUMN `STATUS_ENVIO_EVENTO` VARCHAR(50) NULL,
    ADD COLUMN `STATUS_EQUIP` VARCHAR(50) NULL,
    ADD COLUMN `STATUS_INICIAL_EVENTO` VARCHAR(191) NULL DEFAULT 'INICIADO';

-- AlterTable
ALTER TABLE `ping` ADD COLUMN `DATA_ATUALIZACAO` DATETIME(3) NULL,
    ADD COLUMN `DATA_CRIACAO` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `DATA_DIFF_OFFLINE` VARCHAR(50) NULL,
    ADD COLUMN `DATA_DIFF_ONLINE` VARCHAR(50) NULL,
    ADD COLUMN `DATA_OFFLINE` DATETIME(3) NULL,
    ADD COLUMN `DATA_ONLINE` DATETIME(3) NULL,
    ADD COLUMN `ENDERECO_IP` VARCHAR(50) NULL,
    ADD COLUMN `HORARIO_REALIZADO` DATETIME(3) NULL,
    ADD COLUMN `PERCA_DE_PACOTE` VARCHAR(50) NULL,
    ADD COLUMN `QUANTIDADE_PING` INTEGER NULL DEFAULT 10,
    ADD COLUMN `STATUS_IP` VARCHAR(50) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `equipamento_ENDERECO_IP_key` ON `equipamento`(`ENDERECO_IP`);

-- CreateIndex
CREATE UNIQUE INDEX `ping_ENDERECO_IP_key` ON `ping`(`ENDERECO_IP`);
