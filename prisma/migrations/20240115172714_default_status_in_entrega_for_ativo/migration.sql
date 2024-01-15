-- AlterTable
ALTER TABLE `entrega` MODIFY `status` ENUM('ativo', 'inativo', 'expirado') NOT NULL DEFAULT 'ativo';
