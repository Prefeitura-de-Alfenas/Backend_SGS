/*
  Warnings:

  - Added the required column `equipamentoId` to the `pessoa` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `pessoa` ADD COLUMN `equipamentoId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `pessoa` ADD CONSTRAINT `pessoa_equipamentoId_fkey` FOREIGN KEY (`equipamentoId`) REFERENCES `equipamento`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
