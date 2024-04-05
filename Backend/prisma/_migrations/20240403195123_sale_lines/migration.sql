/*
  Warnings:

  - The primary key for the `sale` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `netAmount` on the `sale` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `sale` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `sale` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `sale` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `sale` table. All the data in the column will be lost.
  - You are about to drop the column `totalAmount` on the `sale` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[saleId]` on the table `sale` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `Id` to the `sale` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gross` to the `sale` table without a default value. This is not possible if the table is not empty.
  - Added the required column `net` to the `sale` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `sale` DROP PRIMARY KEY,
    DROP COLUMN `netAmount`,
    DROP COLUMN `price`,
    DROP COLUMN `productId`,
    DROP COLUMN `quantity`,
    DROP COLUMN `status`,
    DROP COLUMN `totalAmount`,
    ADD COLUMN `Id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `gross` DOUBLE NOT NULL,
    ADD COLUMN `net` DOUBLE NOT NULL,
    MODIFY `saleId` VARCHAR(30) NOT NULL,
    ADD PRIMARY KEY (`Id`);

-- CreateTable
CREATE TABLE `salelines` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `saleId` VARCHAR(30) NOT NULL,
    `productId` VARCHAR(20) NOT NULL,
    `productName` VARCHAR(150) NOT NULL,
    `batchNo` VARCHAR(255) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `amount` DOUBLE NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `sale_saleId_key` ON `sale`(`saleId`);

-- AddForeignKey
ALTER TABLE `salelines` ADD CONSTRAINT `salelines_saleId_fkey` FOREIGN KEY (`saleId`) REFERENCES `sale`(`saleId`) ON DELETE RESTRICT ON UPDATE CASCADE;
