import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsEnum, IsString, IsDate } from 'class-validator';
import { CreateOrderDto } from './create-order.dto';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
  @IsOptional()
  @IsEnum(['pending', 'processing', 'shipped', 'delivered', 'cancelled', 'returned'])
  status?: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'returned';

  @IsOptional()
  @IsEnum(['pending', 'paid', 'failed', 'refunded'])
  paymentStatus?: 'pending' | 'paid' | 'failed' | 'refunded';

  @IsOptional()
  @IsString()
  paymentId?: string;

  @IsOptional()
  @IsString()
  trackingNumber?: string;

  @IsOptional()
  @IsDate()
  estimatedDelivery?: Date;

  @IsOptional()
  @IsDate()
  deliveredAt?: Date;

  @IsOptional()
  @IsString()
  returnReason?: string;

  @IsOptional()
  @IsDate()
  returnDate?: Date;
} 