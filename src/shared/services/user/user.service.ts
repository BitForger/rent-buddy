import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../../../db/user.schema';
import { Model } from 'mongoose';
import { ChargeService } from '../charge/charge.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly chargeService: ChargeService,
  ) {}

  async getUser(email: string) {
    const user = await this.userModel.findOne({ email }).exec();
    const charges = await this.chargeService.getAll(user.id);

    return {
      ...user,
      charges,
    };
  }

  async createUser(email: string, name: string) {
    const user = new this.userModel({
      email,
      name,
    });

    if (await user.save()) {
      return user.toObject();
    }

    throw new Error('Unable to save user');
  }
}
