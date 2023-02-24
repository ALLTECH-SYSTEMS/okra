/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Get, UseGuards, Param } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { Customer } from './customer.schema';
import { PrincipalGuard } from '../auth/principal.guard';


@UseGuards(PrincipalGuard)
@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  async createCustomer(@Body() customer: Customer): Promise<Customer> {
    return this.customerService.createCustomer(customer);
  }

  @Get()
  async getAllCustomersByUserId(@Param('userId') userId: string): Promise<Customer[]> {
    return this.customerService.getAllCustomersByUserId(userId);
  }

  @Get(':id')
  async getCustomerById(@Param('id') id: string): Promise<Customer> {
    return this.customerService.getCustomerById(id);
  }
}
