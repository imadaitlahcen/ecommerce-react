import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto, @Request() req) {
    return this.ordersService.create(createOrderDto, req.user.id);
  }

  @Get()
  @UseGuards(RolesGuard)
  @Roles('admin')
  findAll(@Query() query: any) {
    return this.ordersService.findAll(query);
  }

  @Get('my-orders')
  findByUser(@Request() req) {
    return this.ordersService.findByUser(req.user.id);
  }

  @Get('stats')
  @UseGuards(RolesGuard)
  @Roles('admin')
  getStats() {
    return this.ordersService.getOrderStats();
  }

  @Get('recent')
  @UseGuards(RolesGuard)
  @Roles('admin')
  getRecent(@Query('limit') limit: string) {
    return this.ordersService.getRecentOrders(parseInt(limit) || 10);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    // Users can only view their own orders, admins can view all
    if (req.user.role === 'admin') {
      return this.ordersService.findOne(id);
    }
    // For customers, we need to verify the order belongs to them
    return this.ordersService.findOne(id).then(order => {
      if (order.user.toString() !== req.user.id) {
        throw new Error('Unauthorized');
      }
      return order;
    });
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles('admin')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(id, updateOrderDto);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles('admin')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(id);
  }
} 