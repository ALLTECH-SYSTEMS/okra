/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { UserCreateDto } from './dto/create-user.dto';
import { User } from './user.schema';

@Injectable()
export class UserMapper {
  mapToEntity(dto: UserCreateDto): User {
    const { email, firstName, lastName, password } = dto;
    const user = new User();
    user.email = email;
    user.firstName = firstName;
    user.lastName = lastName;
    user.password = password;
    return user;
  }
}
