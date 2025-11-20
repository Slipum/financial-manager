import { IsNotEmpty, IsNumber } from 'class-validator';

export class DeleteTransactionDto {
  @IsNotEmpty({ message: 'id обязателен' })
  @IsNumber({}, { message: 'id должен быть числом' })
  id: number;
}
