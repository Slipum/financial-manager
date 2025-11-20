import { Injectable } from '@nestjs/common';
import { Operation, Prisma, Transaction } from '../../generated/prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class FinanceService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(): Promise<Transaction[]> {
    return this.prisma.transaction.findMany({
      include: { operations: true },
    });
  }

  async createTransaction(
    data: Prisma.TransactionCreateInput,
  ): Promise<Transaction> {
    return this.prisma.transaction.create({ data });
  }

  async deleteTransaction(
    where: Prisma.TransactionWhereUniqueInput,
  ): Promise<Transaction> {
    return this.prisma.transaction.delete({
      where,
    });
  }

  async getPriceById(
    id: Prisma.TransactionWhereUniqueInput,
  ): Promise<(Transaction & { operations: Operation[] }) | null> {
    return this.prisma.transaction.findUnique({
      where: id,
      include: {
        operations: true,
      },
    });
  }

  async createOperationByTransaction(
    data: Prisma.OperationCreateManyInput,
  ): Promise<Operation> {
    return this.prisma.operation.create({ data });
  }
}
