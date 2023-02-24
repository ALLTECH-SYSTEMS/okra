/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User } from '../user/user.schema';
import { JwtService } from '@nestjs/jwt';
// import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    
    const user = await this.userService.getUserByEmail(email);
    if (user && (password === user.password)) {
        return user;
    } else {
        throw new UnauthorizedException('Invalid email or password');
    }
  }

  async login(user: User): Promise<{ access_token: string }> {
    const payload = { email: user.email, sub: user.password };
    const options = { secret: process.env.JWT_SECRET, expiresIn: '1h' };
    const accessToken = await this.jwtService.signAsync(payload, options);
    // console.log(process.env.JWT_SECRET);
    return {
      access_token: accessToken,
    };
  }
}
