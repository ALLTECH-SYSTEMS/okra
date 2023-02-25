/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Identity {
  @Prop({ required: true })
  firstname: string;

  @Prop()
  middlename: string;

  @Prop({ required: true })
  lastname: string;

  @Prop()
  aliases: string;

  @Prop({ required: true })
  dob: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  gender: string;

  @Prop()
  photo_id: string;

  @Prop({ required: true })
  enrollment_date: string;

  @Prop({ required: true })
  enrollment_bank: string;

  @Prop()
  phones: [string];

  @Prop()
  emails: [string];

  @Prop()
  fullname: string;

  @Prop({ required: true })
  bvn: string;

  @Prop()
  customer: string;

  @Prop()
  identity: string;

  @Prop()
  nin: string;

  @Prop()
  lga_origin: string;

  @Prop()
  lga_residence: string;

  @Prop()
  nationality: string;

  @Prop()
  state_residence: string;

  @Prop()
  state_origin: string;

  @Prop()
  enrollment: {
    bank: string,
    registration_date: string,
  }

  @Prop()
  on_washlist: boolean;

  @Prop()
  marital_status: string;

  @Prop()
  account_level: string;

  @Prop()
  verification_country: string;
}

export const IdentitySchema = SchemaFactory.createForClass(Identity);

