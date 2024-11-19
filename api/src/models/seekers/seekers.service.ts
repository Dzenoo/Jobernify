import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Seeker } from './schemas/seeker.schema';

import { Model } from 'mongoose';

@Injectable()
export class SeekersService {
  constructor(
    @InjectModel(Seeker.name) private readonly seekerModel: Model<Seeker>,
  ) {}

  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];

  async findOne(username: string): Promise<any> {
    return this.users.find((user) => user.username === username);
  }
}
