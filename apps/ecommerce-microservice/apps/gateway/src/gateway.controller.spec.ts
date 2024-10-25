import { Test, TestingModule } from '@nestjs/testing';
import { GatewayController } from './gateway.controller';

describe('GatewayController', () => {
  let gatewayController: GatewayController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [GatewayController],
    }).compile();

    gatewayController = app.get<GatewayController>(GatewayController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(gatewayController.getUsers()).toBe('Hello World!');
    });
  });
});
