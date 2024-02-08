-- CreateTable
CREATE TABLE `arquivo` (
    `id` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `pessoId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `arquivo` ADD CONSTRAINT `arquivo_pessoId_fkey` FOREIGN KEY (`pessoId`) REFERENCES `pessoa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
