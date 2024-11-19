import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Seeker } from './schemas/seeker.schema';

import { Model } from 'mongoose';

@Injectable()
export class SeekersService {
  constructor(
    @InjectModel(Seeker.name) private readonly seekerModel: Model<Seeker>,
  ) {}

  async findOneByEmail(email: string): Promise<any> {
    return await this.seekerModel.findOne({ email: email });
  }
}
