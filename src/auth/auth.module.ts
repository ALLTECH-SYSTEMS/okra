/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { UserMapper } from './auth.mapper';

@Module({
imports: [
    UserModule, 
    PassportModule,
    JwtModule.register({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '1h' },
    }),
    
],
controllers: [AuthController],
providers: [AuthService, JwtStrategy, UserMapper],
exports: [AuthService],
})
export class AuthModule {}
