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
import { Operation, Transaction } from '../../generated/prisma/client';
import { DeleteTransactionDto } from './dto/transaction.dto';

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
  async createTransaction(
    @Body() data: { closeDate: string; operations?: Operation[] },
  ): Promise<Transaction> {
    const { closeDate, operations } = data;
    try {
      const result = await this.financeService.createTransaction({
        closeDate,
        operations: operations
          ? {
              create: operations,
            }
          : undefined,
      });
      this.logger.log('Успешное создание транзакции');
      return result;
    } catch (error) {
      this.logger.error('Ошибка при создании транзакции');
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: 'Транзакция не создалась',
        },
        HttpStatus.UNAUTHORIZED,
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
