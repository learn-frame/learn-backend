import { Controller, Get, Inject, OnModuleInit } from '@nestjs/common'
import { ClientGrpc } from '@nestjs/microservices'
import {
  GetProductResponse,
  ProductServiceController
} from 'types/proto/product'
import { Observable } from 'rxjs'
import { Metadata } from '@grpc/grpc-js'
import { GetOrderResponse, OrderServiceController } from 'types/proto/order'

@Controller()
export class GatewayController implements OnModuleInit {
  private productService: ProductServiceController
  private orderService: OrderServiceController
  constructor(
    @Inject('PRODUCT_PACKAGE') private productClient: ClientGrpc,
    @Inject('ORDER_PACKAGE') private orderClient: ClientGrpc
  ) {}

  onModuleInit() {
    this.productService =
      this.productClient.getService<ProductServiceController>('ProductService')
    this.orderService =
      this.orderClient.getService<OrderServiceController>('OrderService')
  }

  @Get('product')
  getProductById():
    | Promise<GetProductResponse>
    | Observable<GetProductResponse>
    | GetProductResponse {
    const metadata = new Metadata()
    return this.productService.getProduct({ productId: '1' }, metadata)
  }

  @Get('order')
  createOrder():
    | Promise<GetOrderResponse>
    | Observable<GetOrderResponse>
    | GetOrderResponse {
    const metadata = new Metadata()
    return this.orderService.createOrder(
      {
        userId: '1',
        items: [
          {
            productId: '1',
            quantity: 1
          },
          {
            productId: '2',
            quantity: 2
          }
        ]
      },
      metadata
    )
  }
}
