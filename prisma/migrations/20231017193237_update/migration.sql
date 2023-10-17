/*
  Warnings:

  - The `status` column on the `orders` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "StatusOrder" AS ENUM ('active', 'disabled');

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "status",
ADD COLUMN     "status" "StatusOrder" NOT NULL DEFAULT 'active';

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "status" BOOLEAN NOT NULL DEFAULT true;
