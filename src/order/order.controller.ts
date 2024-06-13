import { Controller, Post, Get, Body, Request, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Order } from './order.entity';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createOrder(@Request() req, @Body() orderData: Partial<Order>) {
    const userId = req.user.userId;
    return this.orderService.createOrder(userId, orderData);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getOrders(@Request() req) {
    const userId = req.user.userId;
    return this.orderService.getOrders(userId);
  }
}
