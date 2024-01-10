-- AlterTable
ALTER TABLE `pessoa` MODIFY `status` ENUM('ativo', 'inativo', 'expirado') NOT NULL DEFAULT 'ativo';
