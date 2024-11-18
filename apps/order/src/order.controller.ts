import { Metadata } from '@grpc/grpc-js'
import { Controller, Logger } from '@nestjs/common'
import { GrpcMethod } from '@nestjs/microservices'
import { Observable } from 'rxjs'
import {
  CancelOrderRequest,
  CancelOrderResponse,
  CreateOrderRequest,
  CreateOrderResponse,
  GetOrderRequest,
  GetOrderResponse,
  OrderServiceController
} from 'types/proto/order'
import { OrderService } from './order.service'

@Controller()
export class OrderController implements OrderServiceController {
  constructor(
    private readonly orderService: OrderService,
    private readonly logger: Logger
  ) {}

  @GrpcMethod('OrderService', 'CreateOrder')
  createOrder(
    request: CreateOrderRequest,
    metadata: Metadata,
    ...rest: unknown[]
  ):
    | Promise<CreateOrderResponse>
    | Observable<CreateOrderResponse>
    | CreateOrderResponse {
    this.logger.log('call createOrder rpc')
    console.log(metadata, rest)
    return this.orderService.createOrder(request)
  }

  getOrder(
    request: GetOrderRequest,
    metadata: Metadata,
    ...rest: unknown[]
  ):
    | Promise<GetOrderResponse>
    | Observable<GetOrderResponse>
    | GetOrderResponse {
    console.log(request, metadata, rest)
    throw new Error('Method not implemented.')
  }

  cancelOrder(
    request: CancelOrderRequest,
    metadata: Metadata,
    ...rest: unknown[]
  ):
    | Promise<CancelOrderResponse>
    | Observable<CancelOrderResponse>
    | CancelOrderResponse {
    console.log(request, metadata, rest)
    throw new Error('Method not implemented.')
  }
}
