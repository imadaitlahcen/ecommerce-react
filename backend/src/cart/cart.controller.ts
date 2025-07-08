import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { CartService } from './cart.service';
import { AddToCartDto, UpdateCartItemDto } from './dto/cart.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('cart')
@UseGuards(JwtAuthGuard)
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  async getCart(@Request() req) {
    return this.cartService.getCart(req.user.id);
  }

  @Post('add')
  async addToCart(@Request() req, @Body() addToCartDto: AddToCartDto) {
    return this.cartService.addToCart(req.user.id, addToCartDto);
  }

  @Put('item/:productId')
  async updateCartItem(
    @Request() req,
    @Param('productId') productId: string,
    @Body() updateDto: UpdateCartItemDto
  ) {
    return this.cartService.updateCartItem(req.user.id, productId, updateDto);
  }

  @Delete('item/:productId')
  async removeFromCart(@Request() req, @Param('productId') productId: string) {
    return this.cartService.removeFromCart(req.user.id, productId);
  }

  @Delete('clear')
  async clearCart(@Request() req) {
    return this.cartService.clearCart(req.user.id);
  }
} 