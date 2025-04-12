-- AlterTable
ALTER TABLE `beneficio` MODIFY `status` ENUM('ativo', 'inativo', 'expirado', 'bloqueado', 'cancelado', 'pendente', 'aprovado') NOT NULL DEFAULT 'ativo';

-- AlterTable
ALTER TABLE `entrega` MODIFY `status` ENUM('ativo', 'inativo', 'expirado', 'bloqueado', 'cancelado', 'pendente', 'aprovado') NOT NULL DEFAULT 'pendente';

-- AlterTable
ALTER TABLE `equipamento` MODIFY `status` ENUM('ativo', 'inativo', 'expirado', 'bloqueado', 'cancelado', 'pendente', 'aprovado') NOT NULL DEFAULT 'ativo';

-- AlterTable
ALTER TABLE `pessoa` MODIFY `status` ENUM('ativo', 'inativo', 'expirado', 'bloqueado', 'cancelado', 'pendente', 'aprovado') NOT NULL DEFAULT 'ativo';

-- AlterTable
ALTER TABLE `usuario` MODIFY `status` ENUM('ativo', 'inativo', 'expirado', 'bloqueado', 'cancelado', 'pendente', 'aprovado') NOT NULL;
