/*
  Warnings:

  - You are about to drop the column `city` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `customers` table. All the data in the column will be lost.
  - Added the required column `mobileNumber` to the `customers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "customers" DROP COLUMN "city",
DROP COLUMN "phone",
ADD COLUMN     "mobileNumber" TEXT NOT NULL DEFAULT '02435647687',
ADD COLUMN     "salutation" TEXT,
ADD COLUMN     "town" TEXT;
