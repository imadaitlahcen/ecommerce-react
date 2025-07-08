import { Controller, Get, Patch, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { OrdersService } from '../orders/orders.service';

@Controller('admin/orders')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
export class AdminOrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  async getAllOrders() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  async getOrderById(@Param('id') id: string) {
    return this.ordersService.findById(id);
  }

  @Patch(':id/status')
  async updateOrderStatus(
    @Param('id') id: string, 
    @Body() body: { status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'returned' }
  ) {
    return this.ordersService.updateStatus(id, body.status);
  }

  @Patch(':id/payment-status')
  async updatePaymentStatus(
    @Param('id') id: string, 
    @Body() body: { paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded' }
  ) {
    return this.ordersService.updatePaymentStatus(id, body.paymentStatus);
  }

  @Delete(':id')
  async deleteOrder(@Param('id') id: string) {
    return this.ordersService.remove(id);
  }
} 