import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './create-order.dto';
import { IsIn, IsOptional } from 'class-validator';
import { OrderStatus } from 'src/status.enum';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
  @IsOptional()
  @IsIn([OrderStatus.Approved, OrderStatus.Cancelled])
  status?: OrderStatus;
}
