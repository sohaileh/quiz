import { Test, TestingModule } from '@nestjs/testing';
import { AssignController } from './assign.controller';
import { AssignService } from './assign.service';

describe('AssignController', () => {
  let controller: AssignController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssignController],
      providers: [AssignService],
    }).compile();

    controller = module.get<AssignController>(AssignController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
