import { Controller, Get, Inject, OnModuleInit } from '@nestjs/common'
import { ClientGrpc } from '@nestjs/microservices'
import {
  GetProductResponse,
  ProductServiceController
} from 'types/proto/product'
import { Observable } from 'rxjs'
import { Metadata } from '@grpc/grpc-js'

@Controller()
export class GatewayController implements OnModuleInit {
  private productService: ProductServiceController
  constructor(@Inject('PRODUCT_PACKAGE') private client: ClientGrpc) {}
  onModuleInit() {
    this.productService =
      this.client.getService<ProductServiceController>('ProductService')
  }
  @Get()
  getProduct():
    | Promise<GetProductResponse>
    | Observable<GetProductResponse>
    | GetProductResponse {
    const metadata = new Metadata()
    return this.productService.getProduct({ productId: '1' }, metadata)
  }
}
