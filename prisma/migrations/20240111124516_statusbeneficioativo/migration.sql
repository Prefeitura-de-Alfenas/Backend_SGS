-- AlterTable
ALTER TABLE `beneficio` MODIFY `status` ENUM('ativo', 'inativo', 'expirado') NOT NULL DEFAULT 'ativo';
