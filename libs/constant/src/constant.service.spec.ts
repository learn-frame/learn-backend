import { Test, TestingModule } from '@nestjs/testing';
import { ConstantService } from './constant.service';

describe('ConstantService', () => {
  let service: ConstantService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConstantService],
    }).compile();

    service = module.get<ConstantService>(ConstantService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
