import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Order, OrderDocument } from './schemas/order.schema';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ProductsService } from '../products/products.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    private productsService: ProductsService,
    private usersService: UsersService,
  ) {}

  async create(createOrderDto: CreateOrderDto, userId: string): Promise<Order> {
    // Validate and update stock for each product
    for (const item of createOrderDto.items) {
      await this.productsService.updateStock(item.product, item.quantity);
    }

    // Update user stats
    await this.usersService.updateStats(userId, createOrderDto.total);

    const newOrder = new this.orderModel({
      ...createOrderDto,
      user: new Types.ObjectId(userId),
    });

    return newOrder.save();
  }

  async findAll(query?: any): Promise<Order[]> {
    const filter: any = {};

    if (query.userId) {
      filter.user = new Types.ObjectId(query.userId);
    }

    if (query.status) {
      filter.status = query.status;
    }

    if (query.paymentStatus) {
      filter.paymentStatus = query.paymentStatus;
    }

    return this.orderModel
      .find(filter)
      .populate('user', 'name email')
      .sort({ createdAt: -1 })
      .exec();
  }

  async findOne(id: string): Promise<Order> {
    const order = await this.orderModel
      .findById(id)
      .populate('user', 'name email')
      .exec();

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return order;
  }

  async findByUser(userId: string): Promise<Order[]> {
    return this.orderModel
      .find({ user: new Types.ObjectId(userId) })
      .populate('user', 'name email')
      .sort({ createdAt: -1 })
      .exec();
  }

  async update(id: string, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const order = await this.orderModel.findById(id).exec();
    if (!order) {
      throw new NotFoundException('Order not found');
    }

    // Handle status changes
    if (updateOrderDto.status && updateOrderDto.status !== order.status) {
      // If order is being cancelled, restore stock
      if (updateOrderDto.status === 'cancelled' && order.status !== 'cancelled') {
        for (const item of order.items) {
          await this.productsService.updateStock(item.product.toString(), -item.quantity);
        }
      }

      // If order is being returned
      if (updateOrderDto.status === 'returned' && !order.isReturned) {
        const updateFields: any = {
          isReturned: true,
          returnDate: new Date(),
        };
        Object.assign(updateOrderDto, updateFields);
        // Restore stock for returned items
        for (const item of order.items) {
          await this.productsService.updateStock(item.product.toString(), -item.quantity);
        }
      }

      // If order is delivered
      if (updateOrderDto.status === 'delivered' && order.status !== 'delivered') {
        updateOrderDto.deliveredAt = new Date();
      }
    }

    const updatedOrder = await this.orderModel
      .findByIdAndUpdate(id, updateOrderDto, { new: true })
      .populate('user', 'name email')
      .exec();

    return updatedOrder;
  }

  async remove(id: string): Promise<void> {
    const result = await this.orderModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException('Order not found');
    }
  }

  async getOrderStats(): Promise<any> {
    const stats = await this.orderModel.aggregate([
      {
        $group: {
          _id: null,
          totalOrders: { $sum: 1 },
          totalRevenue: { $sum: '$total' },
          averageOrderValue: { $avg: '$total' },
        },
      },
    ]);

    const statusStats = await this.orderModel.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
        },
      },
    ]);

    const monthlyStats = await this.orderModel.aggregate([
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' },
          },
          orders: { $sum: 1 },
          revenue: { $sum: '$total' },
        },
      },
      { $sort: { '_id.year': -1, '_id.month': -1 } },
      { $limit: 12 },
    ]);

    return {
      overview: stats[0] || { totalOrders: 0, totalRevenue: 0, averageOrderValue: 0 },
      byStatus: statusStats,
      monthly: monthlyStats,
    };
  }

  async getRecentOrders(limit: number = 10): Promise<Order[]> {
    return this.orderModel
      .find()
      .populate('user', 'name email')
      .sort({ createdAt: -1 })
      .limit(limit)
      .exec();
  }

  async count(): Promise<number> {
    return this.orderModel.countDocuments().exec();
  }

  async findById(id: string): Promise<Order> {
    const order = await this.orderModel
      .findById(id)
      .populate('user', 'name email')
      .exec();

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return order;
  }

  async updateStatus(id: string, status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'returned'): Promise<Order> {
    const order = await this.orderModel.findById(id).exec();
    if (!order) {
      throw new NotFoundException('Order not found');
    }

    // Handle status changes
    if (status !== order.status) {
      // If order is being cancelled, restore stock
      if (status === 'cancelled' && order.status !== 'cancelled') {
        for (const item of order.items) {
          await this.productsService.updateStock(item.product.toString(), -item.quantity);
        }
      }

      // If order is being returned
      if (status === 'returned' && !order.isReturned) {
        // Restore stock for returned items
        for (const item of order.items) {
          await this.productsService.updateStock(item.product.toString(), -item.quantity);
        }
      }

      // If order is delivered
      if (status === 'delivered' && order.status !== 'delivered') {
        order.deliveredAt = new Date();
      }
    }

    order.status = status;
    return order.save();
  }

  async updatePaymentStatus(id: string, paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded'): Promise<Order> {
    const order = await this.orderModel.findById(id).exec();
    if (!order) {
      throw new NotFoundException('Order not found');
    }

    order.paymentStatus = paymentStatus;
    return order.save();
  }

  async getTotalRevenue(): Promise<number> {
    const result = await this.orderModel.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$total' },
        },
      },
    ]);

    return result[0]?.totalRevenue || 0;
  }
} 