import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UsersService } from '../users/users.service';
import { ProductsService } from '../products/products.service';
import { OrdersService } from '../orders/orders.service';
import { OrderDocument } from '../orders/schemas/order.schema';

@Controller('admin/dashboard')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
export class AdminDashboardController {
  constructor(
    private readonly usersService: UsersService,
    private readonly productsService: ProductsService,
    private readonly ordersService: OrdersService,
  ) {}

  @Get('stats')
  async getStats() {
    const [totalUsers, totalProducts, totalOrders, recentOrders] = await Promise.all([
      this.usersService.count(),
      this.productsService.count(),
      this.ordersService.count(),
      this.ordersService.getRecentOrders(5),
    ]);

    const totalRevenue = await this.ordersService.getTotalRevenue();

    return {
      totalUsers,
      totalProducts,
      totalOrders,
      totalRevenue,
      recentOrders: recentOrders.map((order: OrderDocument) => ({
        id: order._id,
        customer: order.shippingAddress.name,
        amount: order.total,
        status: order.status,
        date: (order as any).createdAt,
      })),
    };
  }
} 