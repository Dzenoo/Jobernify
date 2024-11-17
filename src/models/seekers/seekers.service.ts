import { Injectable } from '@nestjs/common';
import { CreateSeekerDto } from './dto/create-seeker.dto';
import { UpdateSeekerDto } from './dto/update-seeker.dto';
import { PasswordService } from 'src/common/services/password.service';
import { InjectModel } from '@nestjs/mongoose';
import { Seeker } from './schemas/seeker.schema';
import { Model } from 'mongoose';

@Injectable()
export class SeekersService {
  constructor(
    @InjectModel(Seeker.name) private readonly seekerModel: Model<Seeker>,
    private readonly passwordService: PasswordService,
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
