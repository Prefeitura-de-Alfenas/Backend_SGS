-- AlterTable
ALTER TABLE `equipamento` MODIFY `status` ENUM('ativo', 'inativo', 'expirado') NOT NULL DEFAULT 'ativo';
