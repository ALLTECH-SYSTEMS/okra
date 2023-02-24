/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Get, UseGuards, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.schema';
import { UserMapper } from './user.mapper';
import { UserCreateDto } from './dto/create-user.dto';
import { PrincipalGuard } from '../auth/principal.guard';
import { AuthService } from '../auth/auth.service';
import { LoginDto } from '../auth/dto/login.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService, private readonly authService: AuthService, private readonly userMapper: UserMapper) {}

  @Post()
  @UseGuards(PrincipalGuard)
  async createUser(@Body() userCreateDto: UserCreateDto): Promise<User> {
    const user = this.userMapper.mapToEntity(userCreateDto);
    return this.userService.createUser(user);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<{ access_token: string }> {
    // console.log(loginDto);
    const user = await this.authService.validateUser(loginDto.email, loginDto.password);
    return this.authService.login(user);
  }

  @Get()
  @UseGuards(PrincipalGuard)
  async getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  @UseGuards(PrincipalGuard)
  async getUserById(@Param('id') id: string): Promise<User> {
    return this.userService.getUserById(id);
  }
}
