/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `pessoa` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `pessoa_slug_key` ON `pessoa`(`slug`);
