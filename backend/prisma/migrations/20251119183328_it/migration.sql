/*
  Warnings:

  - You are about to drop the `Adding` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Purchase` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "TypeOperations" AS ENUM ('DELIVERY_FOODS', 'PERSONAL_PURCHASES', 'OTHERS');

-- DropForeignKey
ALTER TABLE "Purchase" DROP CONSTRAINT "Purchase_addingId_fkey";

-- DropTable
DROP TABLE "Adding";

-- DropTable
DROP TABLE "Purchase";

-- DropEnum
DROP TYPE "TypePurchase";

-- CreateTable
CREATE TABLE "Operations" (
    "id" SERIAL NOT NULL,
    "label" TEXT NOT NULL,
    "type" "TypeOperations" NOT NULL,
    "create_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "close_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Operations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Operations_id_key" ON "Operations"("id");
