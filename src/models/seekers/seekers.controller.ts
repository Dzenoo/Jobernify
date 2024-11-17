import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SeekersService } from './seekers.service';
import { CreateSeekerDto } from './dto/create-seeker.dto';
import { UpdateSeekerDto } from './dto/update-seeker.dto';

@Controller('seekers')
export class SeekersController {
  constructor(private readonly seekersService: SeekersService) {}

  @Post()
  create(@Body() createSeekerDto: CreateSeekerDto) {
    return this.seekersService.create(createSeekerDto);
  }

  @Get()
  findAll() {
    return this.seekersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.seekersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSeekerDto: UpdateSeekerDto) {
    return this.seekersService.update(+id, updateSeekerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.seekersService.remove(+id);
  }
}
