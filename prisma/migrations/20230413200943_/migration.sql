/*
  Warnings:

  - You are about to alter the column `ID_EMPRESA__EVENTO` on the `event_host` table. The data in that column could be lost. The data in that column will be cast from `VarChar(150)` to `VarChar(50)`.
  - You are about to alter the column `IP_GATEWAY_HOST_EVENTO` on the `event_host` table. The data in that column could be lost. The data in that column will be cast from `VarChar(150)` to `VarChar(50)`.
  - You are about to alter the column `ZONA_HOST_EVENTO` on the `event_host` table. The data in that column could be lost. The data in that column will be cast from `VarChar(150)` to `VarChar(50)`.
  - You are about to alter the column `PARTICAO_HOST_EVENTO` on the `event_host` table. The data in that column could be lost. The data in that column will be cast from `VarChar(150)` to `VarChar(50)`.
  - You are about to alter the column `CONTA` on the `host` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(50)`.
  - You are about to alter the column `ID_EMPRESA` on the `host` table. The data in that column could be lost. The data in that column will be cast from `VarChar(150)` to `VarChar(50)`.
  - You are about to alter the column `IP_GATEWAY_HOST` on the `host` table. The data in that column could be lost. The data in that column will be cast from `VarChar(150)` to `VarChar(50)`.
  - You are about to alter the column `DESCRICAO_HOST` on the `host` table. The data in that column could be lost. The data in that column will be cast from `VarChar(150)` to `VarChar(50)`.
  - You are about to alter the column `ZONA_HOST` on the `host` table. The data in that column could be lost. The data in that column will be cast from `VarChar(150)` to `VarChar(50)`.
  - You are about to alter the column `PARTICAO_HOST` on the `host` table. The data in that column could be lost. The data in that column will be cast from `VarChar(150)` to `VarChar(50)`.
  - You are about to alter the column `PERCA_DE_PACOTE` on the `host` table. The data in that column could be lost. The data in that column will be cast from `VarChar(150)` to `VarChar(50)`.
  - You are about to alter the column `STATUS_INICIAL_EVENTO` on the `host` table. The data in that column could be lost. The data in that column will be cast from `VarChar(150)` to `VarChar(50)`.
  - You are about to alter the column `STATUS_ENVIO_EVENTO` on the `host` table. The data in that column could be lost. The data in that column will be cast from `VarChar(150)` to `VarChar(50)`.

*/
-- AlterTable
ALTER TABLE `event_host` ADD COLUMN `CODIGO_EVENTO` VARCHAR(50) NULL,
    MODIFY `ID_EMPRESA__EVENTO` VARCHAR(50) NULL,
    MODIFY `IP_GATEWAY_HOST_EVENTO` VARCHAR(50) NULL,
    MODIFY `ZONA_HOST_EVENTO` VARCHAR(50) NULL,
    MODIFY `PARTICAO_HOST_EVENTO` VARCHAR(50) NULL;

-- AlterTable
ALTER TABLE `host` MODIFY `CONTA` VARCHAR(50) NULL,
    MODIFY `ID_EMPRESA` VARCHAR(50) NULL,
    MODIFY `IP_GATEWAY_HOST` VARCHAR(50) NULL,
    MODIFY `DESCRICAO_HOST` VARCHAR(50) NULL,
    MODIFY `ZONA_HOST` VARCHAR(50) NULL,
    MODIFY `PARTICAO_HOST` VARCHAR(50) NULL,
    MODIFY `PERCA_DE_PACOTE` VARCHAR(50) NULL,
    MODIFY `STATUS_INICIAL_EVENTO` VARCHAR(50) NULL,
    MODIFY `STATUS_ENVIO_EVENTO` VARCHAR(50) NULL;
