import { Injectable } from '@nestjs/common'
import { Observable } from 'rxjs'
import { CreateOrderRequest, CreateOrderResponse } from 'types/proto/order'
import { RabbitSubscribe, AmqpConnection } from '@golevelup/nestjs-rabbitmq'

@Injectable()
export class OrderService {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  createOrder(
    request: CreateOrderRequest
  ):
    | Promise<CreateOrderResponse>
    | Observable<CreateOrderResponse>
    | CreateOrderResponse {
    const result = this.amqpConnection.publish(
      'MQ_SERVICE',
      'order_created',
      request
    )

    console.log(result)

    return {
      order: {
        orderId: '',
        userId: '',
        items: [],
        totalPrice: 1
      }
    }
  }

  @RabbitSubscribe({
    exchange: 'MQ_SERVICE',
    routingKey: 'order_created'
  })
  public async subscribe(content: Buffer, msg: {}) {
    const message = JSON.parse(content.toString())
    console.log(message)
  }
}
