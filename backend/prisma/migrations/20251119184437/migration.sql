/*
  Warnings:

  - You are about to drop the column `transactionsId` on the `Operation` table. All the data in the column will be lost.
  - You are about to drop the `Transactions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Operation" DROP CONSTRAINT "Operation_transactionsId_fkey";

-- AlterTable
ALTER TABLE "Operation" DROP COLUMN "transactionsId",
ADD COLUMN     "transactionId" INTEGER;

-- DropTable
DROP TABLE "Transactions";

-- CreateTable
CREATE TABLE "Transaction" (
    "id" SERIAL NOT NULL,
    "create_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "close_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_id_key" ON "Transaction"("id");

-- AddForeignKey
ALTER TABLE "Operation" ADD CONSTRAINT "Operation_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction"("id") ON DELETE SET NULL ON UPDATE CASCADE;
