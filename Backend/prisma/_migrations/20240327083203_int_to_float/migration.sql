/*
  Warnings:

  - You are about to alter the column `review` on the `service_reviews` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.

*/
-- AlterTable
ALTER TABLE `service_reviews` MODIFY `review` DOUBLE NOT NULL;
