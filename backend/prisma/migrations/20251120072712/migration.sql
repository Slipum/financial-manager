/*
  Warnings:

  - Added the required column `value` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "value" INTEGER NOT NULL;
