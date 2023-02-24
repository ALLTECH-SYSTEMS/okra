/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Get, UseGuards, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.schema';
import { UserMapper } from './user.mapper';
import { UserCreateDto } from './dto/create-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService, private readonly userMapper: UserMapper) {}

  @Post()
  async createUser(@Body() userCreateDto: UserCreateDto): Promise<User> {
    const user = this.userMapper.mapToEntity(userCreateDto);
    return this.userService.createUser(user);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getUserById(@Param('id') id: string): Promise<User> {
    return this.userService.getUserById(id);
  }
}
