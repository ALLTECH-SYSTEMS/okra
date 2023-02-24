/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../user/user.schema';

@Schema()
export class Customer extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  userId: User;

  @Prop()
  email: string;

  @Prop()
  phoneNumber: string;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
