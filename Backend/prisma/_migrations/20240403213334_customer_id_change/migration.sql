/*
  Warnings:

  - You are about to drop the column `customerId` on the `sale` table. All the data in the column will be lost.
  - Added the required column `customer_id` to the `sale` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `sale` DROP COLUMN `customerId`,
    ADD COLUMN `customer_id` VARCHAR(20) NOT NULL;
