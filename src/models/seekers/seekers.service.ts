import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Seeker } from './schemas/seeker.schema';
import { Model } from 'mongoose';

@Injectable()
export class SeekersService {
  constructor(
    @InjectModel(Seeker.name) private readonly seekerModel: Model<Seeker>,
  ) {}
}
