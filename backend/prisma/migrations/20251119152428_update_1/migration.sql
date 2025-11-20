/*
  Warnings:

  - You are about to drop the column `created` on the `Adding` table. All the data in the column will be lost.
  - Added the required column `close_date` to the `Adding` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TypePurchase" AS ENUM ('DELIVERY_FOODS', 'PERSONAL_PURCHASES', 'OTHERS');

-- AlterTable
ALTER TABLE "Adding" DROP COLUMN "created",
ADD COLUMN     "close_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "create_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "Purchase" (
    "id" SERIAL NOT NULL,
    "label" TEXT NOT NULL,
    "type" "TypePurchase" NOT NULL,
    "addingId" INTEGER,

    CONSTRAINT "Purchase_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Purchase_id_key" ON "Purchase"("id");

-- AddForeignKey
ALTER TABLE "Purchase" ADD CONSTRAINT "Purchase_addingId_fkey" FOREIGN KEY ("addingId") REFERENCES "Adding"("id") ON DELETE SET NULL ON UPDATE CASCADE;
