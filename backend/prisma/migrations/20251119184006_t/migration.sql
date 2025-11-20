/*
  Warnings:

  - You are about to drop the `Operations` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Operations";

-- CreateTable
CREATE TABLE "Operation" (
    "id" SERIAL NOT NULL,
    "label" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "type" "TypeOperations" NOT NULL,
    "create_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "transactionsId" INTEGER,

    CONSTRAINT "Operation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transactions" (
    "id" SERIAL NOT NULL,
    "create_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "close_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Transactions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Operation_id_key" ON "Operation"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Transactions_id_key" ON "Transactions"("id");

-- AddForeignKey
ALTER TABLE "Operation" ADD CONSTRAINT "Operation_transactionsId_fkey" FOREIGN KEY ("transactionsId") REFERENCES "Transactions"("id") ON DELETE SET NULL ON UPDATE CASCADE;
