import { Test, TestingModule } from '@nestjs/testing'
import { ProductsController } from './products.controller'
import { ProductsService } from './products.service'

describe('ProductsController', () => {
  let grpcClientController: ProductsController

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [ProductsService]
    }).compile()

    grpcClientController = app.get<ProductsController>(ProductsController)
  })

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(grpcClientController.getHello()).toBe('Hello World!')
    })
  })
})
