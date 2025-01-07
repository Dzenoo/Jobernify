import { Test, TestingModule } from '@nestjs/testing';

import { SeekersController } from './seekers.controller';
import { SeekersService } from './seekers.service';

describe('SeekersController', () => {
  let controller: SeekersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SeekersController],
      providers: [SeekersService],
    }).compile();

    controller = module.get<SeekersController>(SeekersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
