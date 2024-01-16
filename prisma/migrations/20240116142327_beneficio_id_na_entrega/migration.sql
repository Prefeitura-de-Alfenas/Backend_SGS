/*
  Warnings:

  - Added the required column `beneficioId` to the `entrega` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `entrega` ADD COLUMN `beneficioId` VARCHAR(191) NOT NULL,
    MODIFY `datacadastro` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AddForeignKey
ALTER TABLE `entrega` ADD CONSTRAINT `entrega_beneficioId_fkey` FOREIGN KEY (`beneficioId`) REFERENCES `beneficio`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
