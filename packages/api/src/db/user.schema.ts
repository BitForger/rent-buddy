import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type UserDocument = User & Document;

@Schema({
  strictQuery: 'throw',
  timestamps: true,
})
export class User {
  @Prop() name: string;

  @Prop() email: string;
}

export const UserSchema = SchemaFactory.createForClass(User);