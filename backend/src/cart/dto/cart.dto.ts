import { IsMongoId, IsNumber, IsString, Min, IsOptional } from 'class-validator';

export class AddToCartDto {
  @IsMongoId()
  productId: string;

  @IsNumber()
  @Min(1)
  quantity: number;

  @IsNumber()
  @Min(0)
  price: number;

  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  image?: string;
}

export class UpdateCartItemDto {
  @IsNumber()
  @Min(1)
  quantity: number;
}

export class RemoveFromCartDto {
  @IsMongoId()
  productId: string;
} 