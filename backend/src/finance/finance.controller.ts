import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FinanceService } from './finance.service';
import { Transaction } from '../../generated/prisma/client';
import {
  CreateTransactionDto,
  DeleteTransactionDto,
} from './dto/transaction.dto';

@Controller('finance')
export class FinanceController {
  constructor(private readonly financeService: FinanceService) {}
  private readonly logger = new Logger(FinanceService.name);

  @Get()
  getAll(): Promise<Transaction[]> {
    this.logger.log('Получение всех транзакций');
    return this.financeService.getAll();
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async createTransaction(
    @Body()
    data: CreateTransactionDto,
  ): Promise<Transaction> {
    try {
      const prismaOperations = data.operations
        ? {
            create: data.operations.map((op) => ({
              label: op.label,
              value: op.value,
              type: op.type,
            })),
          }
        : undefined;
      const result = await this.financeService.createTransaction({
        value: data.value,
        closeDate: new Date(data.closeDate),
        operations: prismaOperations,
      });
      this.logger.log('Успешное создание транзакции');
      return result;
    } catch (error) {
      this.logger.error('Ошибка при создании транзакции');
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Транзакция не создалась',
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: error,
        },
      );
    }
  }

  @Delete()
  @UsePipes(new ValidationPipe({ transform: true }))
  async deleteTransaction(
    @Body() deleteTransactionDto: DeleteTransactionDto,
  ): Promise<Transaction> {
    try {
      const result =
        await this.financeService.deleteTransaction(deleteTransactionDto);
      this.logger.log(
        `Транзакция с id: ${deleteTransactionDto.id} успешно удалена`,
      );
      return result;
    } catch (error) {
      this.logger.error(
        `Ошибка при удалении транзакции с id: ${deleteTransactionDto.id}`,
      );
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'По такому id транзакции не существует',
        },
        HttpStatus.NOT_FOUND,
        {
          cause: error,
        },
      );
    }
  }
}
