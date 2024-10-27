import { Controller, Get, Inject, OnModuleInit } from '@nestjs/common'
import { ClientGrpc } from '@nestjs/microservices'
import { Metadata } from '@grpc/grpc-js'

interface ProductById {
  id: number
}
interface Product {
  id: number
  name: string
}
interface ProductsService {
  findOne: (productById: ProductById, metadata: Metadata) => Product
}

@Controller()
export class GatewayController implements OnModuleInit {
  private productsService: ProductsService
  constructor(@Inject('PRODUCT_PACKAGE') private client: ClientGrpc) {}
  onModuleInit() {
    this.productsService =
      this.client.getService<ProductsService>('ProductsService')
  }
  @Get()
  getProduct(): Product {
    // 第二个参数可以传递元数据
    const metadata = new Metadata()
    metadata.add('Set-Cookie', 'yummy_cookie=choco')
    return this.productsService.findOne({ id: 2 }, metadata)
  }
}
