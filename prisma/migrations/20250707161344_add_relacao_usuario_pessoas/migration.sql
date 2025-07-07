-- AlterTable
ALTER TABLE `pessoa` ADD COLUMN `usuarioId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `pessoa` ADD CONSTRAINT `pessoa_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `usuario`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
