import { Test, TestingModule } from '@nestjs/testing';

import { SeekersService } from './seekers.service';

describe('SeekersService', () => {
  let service: SeekersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SeekersService],
    }).compile();

    service = module.get<SeekersService>(SeekersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
