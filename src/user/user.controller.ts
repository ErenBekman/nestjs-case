import { Controller, Post, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('update-balance/:userId')
    async updateBalance(@Param('userId') userId: number, @Body('amount') amount: number) {
      return this.userService.updateBalance(userId, amount);
    }
}
