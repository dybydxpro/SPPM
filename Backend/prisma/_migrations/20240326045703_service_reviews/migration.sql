/*
  Warnings:

  - A unique constraint covering the columns `[customer_id,name,mobile,email]` on the table `customer` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE `service_reviews` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `customer_id` VARCHAR(20) NOT NULL,
    `name` VARCHAR(50) NOT NULL,
    `email` VARCHAR(120) NOT NULL,
    `mobile` VARCHAR(14) NOT NULL,
    `review` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `service_reviews_customer_id_key`(`customer_id`),
    UNIQUE INDEX `service_reviews_email_key`(`email`),
    UNIQUE INDEX `service_reviews_mobile_key`(`mobile`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `customer_customer_id_name_mobile_email_key` ON `customer`(`customer_id`, `name`, `mobile`, `email`);

-- AddForeignKey
ALTER TABLE `service_reviews` ADD CONSTRAINT `service_reviews_customer_id_name_mobile_email_fkey` FOREIGN KEY (`customer_id`, `name`, `mobile`, `email`) REFERENCES `customer`(`customer_id`, `name`, `mobile`, `email`) ON DELETE RESTRICT ON UPDATE CASCADE;
