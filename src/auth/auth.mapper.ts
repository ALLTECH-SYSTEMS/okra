/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { User } from '../user/user.schema';

@Injectable()
export class UserMapper {
  mapToEntity(dto: LoginDto): User {
    const { email, password } = dto;
    const user = new User();
    user.email = email;
    user.password = password;
    return user;
  }
}
