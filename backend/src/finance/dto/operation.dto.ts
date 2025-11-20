import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export enum TypeOperations {
  DELIVERY_FOODS = 'DELIVERY_FOODS',
  PERSONAL_PURCHASES = 'PERSONAL_PURCHASES',
  OTHERS = 'OTHERS',
}

export class OperationDto {
  @IsString({ message: 'название должна быть строкой' })
  @IsNotEmpty({ message: 'название обязательна' })
  label: string;

  @IsNumber({}, { message: 'цена должно быть числом' })
  @IsNotEmpty({ message: 'цена обязательна' })
  value: number;

  @IsEnum(TypeOperations, {
    message:
      'Тип операции должен быть одним из DELIVERY_FOODS, PERSONAL_PURCHASES, OTHERS',
  })
  type: TypeOperations;

  @IsNumber({}, { message: 'Id транзакции должна быть числом' })
  @IsNotEmpty({ message: 'Id транзакции обязательна' })
  transactionId: number;
}
