/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `customer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[mobile]` on the table `customer` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `customer_email_key` ON `customer`(`email`);

-- CreateIndex
CREATE UNIQUE INDEX `customer_mobile_key` ON `customer`(`mobile`);
