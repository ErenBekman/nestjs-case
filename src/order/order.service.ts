import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { User } from '../user/user.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async createOrder(userId: number, orderData: Partial<Order>): Promise<Order> {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    const totalCost = orderData.quantity * orderData.price;

    if (user.balance < totalCost) {
      throw new Error('Insufficient balance');
    }

    user.balance -= totalCost;
    await this.usersRepository.save(user);

    const order = this.ordersRepository.create({
      ...orderData,
      user,
    });

    return this.ordersRepository.save(order);
  }

  async getOrders(userId: number): Promise<Order[]> {
    return this.ordersRepository.find({ where: { user: { id: userId } } });
  }
}
