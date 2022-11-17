import { Test, TestingModule } from '@nestjs/testing';
import { OrganizeController } from './organize.controller';
import { OrganizeService } from './organize.service';

describe('OrganizeController', () => {
  let controller: OrganizeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrganizeController],
      providers: [OrganizeService],
    }).compile();

    controller = module.get<OrganizeController>(OrganizeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
