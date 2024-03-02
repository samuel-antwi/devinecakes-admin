/*
  Warnings:

  - The `quantity` column on the `orders` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "balance" INTEGER,
ADD COLUMN     "receivedAmount" INTEGER,
DROP COLUMN "quantity",
ADD COLUMN     "quantity" INTEGER;
