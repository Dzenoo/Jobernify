import { Test, TestingModule } from '@nestjs/testing';
import { EmployersService } from './employers.service';

describe('EmployersService', () => {
  let service: EmployersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmployersService],
    }).compile();

    service = module.get<EmployersService>(EmployersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
