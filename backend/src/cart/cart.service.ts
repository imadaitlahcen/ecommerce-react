import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Cart, CartDocument } from './cart.schema';
import { AddToCartDto, UpdateCartItemDto, RemoveFromCartDto } from './dto/cart.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name) private cartModel: Model<CartDocument>,
  ) {}

  async getCart(userId: string): Promise<Cart> {
    let cart = await this.cartModel.findOne({ userId: new Types.ObjectId(userId) });
    
    if (!cart) {
      cart = await this.cartModel.create({
        userId: new Types.ObjectId(userId),
        items: [],
        total: 0,
      });
    }
    
    return cart;
  }

  async addToCart(userId: string, addToCartDto: AddToCartDto): Promise<Cart> {
    let cart = await this.cartModel.findOne({ userId: new Types.ObjectId(userId) });
    
    if (!cart) {
      cart = await this.cartModel.create({
        userId: new Types.ObjectId(userId),
        items: [],
        total: 0,
      });
    }

    const existingItemIndex = cart.items.findIndex(
      item => item.productId.toString() === addToCartDto.productId
    );

    if (existingItemIndex > -1) {
      cart.items[existingItemIndex].quantity += addToCartDto.quantity;
    } else {
      cart.items.push({
        productId: new Types.ObjectId(addToCartDto.productId),
        quantity: addToCartDto.quantity,
        price: addToCartDto.price,
        name: addToCartDto.name,
        image: addToCartDto.image,
      });
    }

    cart.total = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    return await cart.save();
  }

  async updateCartItem(userId: string, productId: string, updateDto: UpdateCartItemDto): Promise<Cart> {
    const cart = await this.cartModel.findOne({ userId: new Types.ObjectId(userId) });
    
    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    const itemIndex = cart.items.findIndex(
      item => item.productId.toString() === productId
    );

    if (itemIndex === -1) {
      throw new NotFoundException('Item not found in cart');
    }

    cart.items[itemIndex].quantity = updateDto.quantity;
    cart.total = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    return await cart.save();
  }

  async removeFromCart(userId: string, productId: string): Promise<Cart> {
    const cart = await this.cartModel.findOne({ userId: new Types.ObjectId(userId) });
    
    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    cart.items = cart.items.filter(
      item => item.productId.toString() !== productId
    );
    
    cart.total = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    return await cart.save();
  }

  async clearCart(userId: string): Promise<Cart> {
    const cart = await this.cartModel.findOne({ userId: new Types.ObjectId(userId) });
    
    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    cart.items = [];
    cart.total = 0;
    
    return await cart.save();
  }
} 