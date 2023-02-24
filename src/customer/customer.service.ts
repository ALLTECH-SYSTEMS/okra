/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Customer } from './customer.schema';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel(Customer.name) private customerModel: Model<Customer>,
  ) {}

  async createCustomer(customer: Customer): Promise<Customer> {
    const createdCustomer = new this.customerModel(customer);
    return createdCustomer.save();
  }

  async getAllCustomersByUserId(userId: string): Promise<Customer[]> {
    return this.customerModel.find({ userId }).exec();
  }

  async getCustomerById(id: string): Promise<Customer> {
    return this.customerModel.findById(id).exec();
  }
}
