-- CreateEnum
CREATE TYPE "TypeOperations" AS ENUM ('DELIVERY_FOODS', 'PERSONAL_PURCHASES', 'OTHERS');

-- CreateTable
CREATE TABLE "Operation" (
    "id" SERIAL NOT NULL,
    "label" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "type" "TypeOperations" NOT NULL DEFAULT 'OTHERS',
    "create_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "transactionId" INTEGER,

    CONSTRAINT "Operation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" SERIAL NOT NULL,
    "value" INTEGER NOT NULL,
    "create_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "close_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Operation_id_key" ON "Operation"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_id_key" ON "Transaction"("id");

-- AddForeignKey
ALTER TABLE "Operation" ADD CONSTRAINT "Operation_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction"("id") ON DELETE CASCADE ON UPDATE CASCADE;
