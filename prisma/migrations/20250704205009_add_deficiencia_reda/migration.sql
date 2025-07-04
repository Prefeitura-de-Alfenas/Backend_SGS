-- CreateTable
CREATE TABLE `FonteRenda` (
    `id` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `FonteRenda_nome_key`(`nome`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PessoaFonteRenda` (
    `pessoaId` VARCHAR(191) NOT NULL,
    `fonteRendaId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`pessoaId`, `fonteRendaId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PessoaDeficiencia` (
    `pessoaId` VARCHAR(191) NOT NULL,
    `deficienciaId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`pessoaId`, `deficienciaId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Deficiencia` (
    `id` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Deficiencia_nome_key`(`nome`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PessoaFonteRenda` ADD CONSTRAINT `PessoaFonteRenda_pessoaId_fkey` FOREIGN KEY (`pessoaId`) REFERENCES `pessoa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PessoaFonteRenda` ADD CONSTRAINT `PessoaFonteRenda_fonteRendaId_fkey` FOREIGN KEY (`fonteRendaId`) REFERENCES `FonteRenda`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PessoaDeficiencia` ADD CONSTRAINT `PessoaDeficiencia_pessoaId_fkey` FOREIGN KEY (`pessoaId`) REFERENCES `pessoa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PessoaDeficiencia` ADD CONSTRAINT `PessoaDeficiencia_deficienciaId_fkey` FOREIGN KEY (`deficienciaId`) REFERENCES `Deficiencia`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
