import { Test, TestingModule } from '@nestjs/testing';
import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';

describe('GatewayController', () => {
  let grpcProviderController: GatewayController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [GatewayController],
      providers: [GatewayService],
    }).compile();

    grpcProviderController = app.get<GatewayController>(GatewayController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(grpcProviderController.getHello()).toBe('Hello World!');
    });
  });
});
