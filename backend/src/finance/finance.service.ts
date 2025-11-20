import { Injectable } from '@nestjs/common';
import { Prisma, Transaction } from '../../generated/prisma/client';
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
}
