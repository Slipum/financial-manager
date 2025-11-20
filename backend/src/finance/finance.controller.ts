import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FinanceService } from './finance.service';
import { Operation, Transaction } from '../../generated/prisma/client';
import {
  CreateTransactionDto,
  DeleteTransactionDto,
} from './dto/transaction.dto';
import { OperationDto } from './dto/operation.dto';

@Controller('finance')
export class FinanceController {
  constructor(private readonly financeService: FinanceService) {}
  private readonly logger = new Logger(FinanceService.name);

  @Get()
  getAll(): Promise<Transaction[]> {
    this.logger.log('Получение всех транзакций');
    return this.financeService.getAll();
  }

  @Post('/operation')
  @UsePipes(new ValidationPipe({ transform: true }))
  async createOperationByTransaction(
    @Body() data: OperationDto,
  ): Promise<Operation> {
    try {
      const result =
        await this.financeService.createOperationByTransaction(data);
      this.logger.log(
        `Успешное создание операции для транзакции с id: ${data.transactionId}`,
      );
      return result;
    } catch (error) {
      this.logger.error(
        `Ошибка при создании операции для транзакции с id: ${data.transactionId}`,
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

  @Get('/price/:id')
  async getPriceById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ price: number }> {
    try {
      const result = await this.financeService.getPriceById({ id });
      this.logger.log(`Получение трат по id: ${id}`);
      let count = 0;
      if (result?.operations?.length) {
        result.operations.forEach((op) => {
          count += op.value;
        });
      }
      return { price: count };
    } catch (error) {
      this.logger.error('Ошибка при получении транзакции');
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'По такому id транзакции не существует',
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: error,
        },
      );
    }
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
