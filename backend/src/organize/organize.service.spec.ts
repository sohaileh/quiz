import { Test, TestingModule } from '@nestjs/testing';
import { OrganizeService } from './organize.service';

describe('OrganizeService', () => {
  let service: OrganizeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrganizeService],
    }).compile();

    service = module.get<OrganizeService>(OrganizeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
