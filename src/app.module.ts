import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { CustomerModule } from './customer/customer.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nestjs-mongodb'),
    UserModule,
    CustomerModule,
    AuthModule,
    ConfigModule.forRoot(),
  ],
})
export class AppModule {}
