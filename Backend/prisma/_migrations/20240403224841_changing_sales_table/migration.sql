/*
  Warnings:

  - You are about to drop the column `amount` on the `salelines` table. All the data in the column will be lost.
  - Added the required column `sellingPrice` to the `salelines` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total` to the `salelines` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `salelines` DROP COLUMN `amount`,
    ADD COLUMN `sellingPrice` DOUBLE NOT NULL,
    ADD COLUMN `total` DOUBLE NOT NULL;
