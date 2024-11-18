import { Injectable } from '@nestjs/common';
import { CreateSeekerDto } from './dto/signup-seeker.dto';
import { UpdateSeekerDto } from './dto/update-seeker.dto';
import { BcryptService } from 'src/common/shared/bcrypt/bcrypt.service';

import { InjectModel } from '@nestjs/mongoose';
import { Seeker } from './schemas/seeker.schema';
import { Model } from 'mongoose';

@Injectable()
export class SeekersService {
  constructor(
    @InjectModel(Seeker.name) private readonly seekerModel: Model<Seeker>,
    private readonly bcryptService: BcryptService,
  ) {}

  create(createSeekerDto: CreateSeekerDto) {
    return 'This action adds a new seeker';
  }

  findAll() {
    return `This action returns all seekers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} seeker`;
  }

  update(id: number, updateSeekerDto: UpdateSeekerDto) {
    return `This action updates a #${id} seeker`;
  }

  remove(id: number) {
    return `This action removes a #${id} seeker`;
  }
}
