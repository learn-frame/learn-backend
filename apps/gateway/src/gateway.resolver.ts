import { Metadata } from '@grpc/grpc-js'
import { Inject, Logger, OnModuleInit } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ClientGrpc } from '@nestjs/microservices'
import { Observable } from 'rxjs'
import { GetOrderResponse, OrderServiceController } from 'types/proto/order'
import {
  CreateProductResponse,
  GetProductResponse,
  ProductServiceController
} from 'types/proto/product'
import { CreateProductInput } from './inputs/product.input'
import { OrderResponse } from './models/order.model'
import { ProductResponse } from './models/product.model'

@Resolver()
export class GatewayResolver implements OnModuleInit {
  private productService: ProductServiceController
  private orderService: OrderServiceController
  constructor(
    private readonly logger: Logger,
    @Inject('PRODUCT_SERVICE') private productClient: ClientGrpc,
    @Inject('ORDER_SERVICE') private orderClient: ClientGrpc
  ) {}

  onModuleInit() {
    this.productService =
      this.productClient.getService<ProductServiceController>('ProductService')
    this.orderService =
      this.orderClient.getService<OrderServiceController>('OrderService')
  }

  @Query(() => ProductResponse)
  getProductById(
    @Args('id') id: string
  ):
    | Promise<GetProductResponse>
    | Observable<GetProductResponse>
    | GetProductResponse {
    const metadata = new Metadata()
    return this.productService.getProduct(
      {
        id
      },
      metadata
    )
  }

  @Mutation(() => ProductResponse)
  createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput
  ):
    | Promise<CreateProductResponse>
    | Observable<CreateProductResponse>
    | CreateProductResponse {
    const metadata = new Metadata()
    return this.productService.createProduct(createProductInput, metadata)
  }

  @Mutation(() => OrderResponse)
  createOrder():
    | Promise<GetOrderResponse>
    | Observable<GetOrderResponse>
    | GetOrderResponse {
    const metadata = new Metadata()
    return this.orderService.createOrder(
      {
        userId: 'userId1',
        items: [],
        totalPrice: 0
      },
      metadata
    )
  }
}
