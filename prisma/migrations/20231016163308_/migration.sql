-- CreateEnum
CREATE TYPE "Role" AS ENUM ('administrator', 'chef', 'waiter');

-- CreateEnum
CREATE TYPE "StepType" AS ENUM ('pending', 'preparing', 'readyToServe');

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "step" "StepType" NOT NULL DEFAULT 'pending';

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'waiter';
