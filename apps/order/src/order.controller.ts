import { Metadata } from '@grpc/grpc-js'
import { Controller } from '@nestjs/common'
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
  constructor(private readonly orderService: OrderService) {}

  @GrpcMethod('OrderService', 'CreateOrder')
  createOrder(
    request: CreateOrderRequest,
    metadata: Metadata,
    ...rest: any
  ):
    | Promise<CreateOrderResponse>
    | Observable<CreateOrderResponse>
    | CreateOrderResponse {
    return this.orderService.createOrder(request)
  }

  getOrder(
    request: GetOrderRequest,
    metadata: Metadata,
    ...rest: any
  ):
    | Promise<GetOrderResponse>
    | Observable<GetOrderResponse>
    | GetOrderResponse {
    throw new Error('Method not implemented.')
  }

  cancelOrder(
    request: CancelOrderRequest,
    metadata: Metadata,
    ...rest: any
  ):
    | Promise<CancelOrderResponse>
    | Observable<CancelOrderResponse>
    | CancelOrderResponse {
    throw new Error('Method not implemented.')
  }
}
