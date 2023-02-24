/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User, UserSchema } from './user.schema';
import { AuthService } from 'src/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UserMapper } from './user.mapper';

@Module({
  imports: [
  MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), 
  JwtModule.register({
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: '1h' },
})],
  controllers: [UserController],
  providers: [UserService, AuthService, UserMapper],
  exports: [UserService],
})

export class UserModule {}
