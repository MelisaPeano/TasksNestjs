import { Test, TestingModule } from '@nestjs/testing';
import { AuhController } from './auh.controller';

describe('AuhController', () => {
  let controller: AuhController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuhController],
    }).compile();

    controller = module.get<AuhController>(AuhController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
