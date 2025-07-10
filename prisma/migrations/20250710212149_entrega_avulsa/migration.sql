-- CreateTable
CREATE TABLE `entregaavulsa` (
    `id` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `cpf` VARCHAR(191) NOT NULL,
    `quantidade` INTEGER NOT NULL,
    `observacao` VARCHAR(191) NOT NULL,
    `datacadastro` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `motivo` TEXT NULL,
    `status` ENUM('ativo', 'inativo', 'expirado', 'bloqueado', 'cancelado', 'pendente', 'aprovado') NOT NULL DEFAULT 'ativo',
    `equipamentoId` VARCHAR(191) NOT NULL,
    `beneficioId` VARCHAR(191) NOT NULL,
    `usuarioId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `entregaavulsa` ADD CONSTRAINT `entregaavulsa_equipamentoId_fkey` FOREIGN KEY (`equipamentoId`) REFERENCES `equipamento`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `entregaavulsa` ADD CONSTRAINT `entregaavulsa_beneficioId_fkey` FOREIGN KEY (`beneficioId`) REFERENCES `beneficio`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `entregaavulsa` ADD CONSTRAINT `entregaavulsa_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
