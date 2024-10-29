import { Test, TestingModule } from '@nestjs/testing';
import { MiddilewareService } from './middileware.service';

describe('MiddilewareService', () => {
  let service: MiddilewareService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MiddilewareService],
    }).compile();

    service = module.get<MiddilewareService>(MiddilewareService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
