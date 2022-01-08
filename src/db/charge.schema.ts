import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum ChargeFrequency {
  ONCE = 'once',
  SEMI_MONTHLY = 'semi_monthly',
  BI_WEEKLY = 'bi_weekly',
  MONTHLY = 'monthly',
}

export type ChargeDocument = Charge & Document;

@Schema({
  strictQuery: 'throw',
  timestamps: true,
})
export class Charge {
  @Prop() user: string;

  @Prop() amount: number;

  @Prop() freq: ChargeFrequency;

  @Prop() chargeDays: number[];
}

export const ChargeSchema = SchemaFactory.createForClass(Charge);
