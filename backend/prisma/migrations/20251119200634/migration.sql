-- DropForeignKey
ALTER TABLE "Operation" DROP CONSTRAINT "Operation_transactionId_fkey";

-- AddForeignKey
ALTER TABLE "Operation" ADD CONSTRAINT "Operation_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction"("id") ON DELETE CASCADE ON UPDATE CASCADE;
