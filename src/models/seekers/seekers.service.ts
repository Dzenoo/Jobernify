import { Injectable } from '@nestjs/common';
import { CreateSeekerDto } from './dto/create-seeker.dto';
import { UpdateSeekerDto } from './dto/update-seeker.dto';

@Injectable()
export class SeekersService {
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
