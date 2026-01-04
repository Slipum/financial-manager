import { Type } from 'class-transformer';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export enum TypeOperations {
  DELIVERY_FOODS = 'DELIVERY_FOODS',
  PERSONAL_PURCHASES = 'PERSONAL_PURCHASES',
  OTHERS = 'OTHERS',
}

export class DeleteTransactionDto {
  @IsNotEmpty({ message: 'id обязателен' })
  @IsNumber({}, { message: 'id должен быть числом' })
  id: number;
}

export class CreateTransactionDto {
  @IsNumber({}, { message: 'цена должна быть числом' })
  @IsNotEmpty({ message: 'цена обязательна' })
  value: number;

  @IsDateString({}, { message: 'дата должна быть датой' })
  @IsNotEmpty({ message: 'дата обязательна' })
  closeDate: string;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => OperationDto)
  operations?: OperationDto[];
}

export class OperationDto {
  @IsString({ message: 'название должно быть строкой' })
  @IsNotEmpty({ message: 'название обязательно' })
  label: string;

  @IsNumber({}, { message: 'цена должна быть числом' })
  @IsNotEmpty({ message: 'цена обязательна' })
  value: number;

  @IsEnum(TypeOperations, {
    message:
      'Тип операции должен быть одним из DELIVERY_FOODS, PERSONAL_PURCHASES, OTHERS',
  })
  type: TypeOperations;
}
