import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Charge } from '../../../db/charge.schema';
import { Model } from 'mongoose';

@Injectable()
export class ChargeService {
  constructor(
    @InjectModel(Charge.name) private readonly chargeModel: Model<Charge>,
  ) {}

  async getAll(id: string) {
    const charges = await this.chargeModel.find({ user: id });
    if (charges.length < 1) {
      return [];
    }

    return charges;
  }
}
