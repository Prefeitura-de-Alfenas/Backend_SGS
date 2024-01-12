/*
  Warnings:

  - Added the required column `valor` to the `beneficio` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `beneficio` ADD COLUMN `valor` DECIMAL(10, 2) NOT NULL;
