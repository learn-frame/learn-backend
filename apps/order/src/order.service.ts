import { AmqpConnection, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq'
import { Injectable } from '@nestjs/common'
import { CreateOrderRequest, CreateOrderResponse } from 'types/proto/order'

@Injectable()
export class OrderService {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  async createOrder(request: CreateOrderRequest): Promise<CreateOrderResponse> {
    const result = await this.amqpConnection.publish(
      'MQ_SERVICE',
      'order_created',
      request
    )
    console.log(result)

    return {
      order: {
        id: '',
        userId: '',
        items: [],
        totalPrice: 1,
        createdAt: new Date().getTime().toString(),
        updatedAt: new Date().getTime().toString()
      }
    }
  }

  @RabbitSubscribe({
    exchange: 'MQ_SERVICE',
    routingKey: 'order_created'
  })
  public async subscribe(content: Buffer, msg: unknown) {
    const message = JSON.parse(content.toString())
    console.log(message, msg)
  }
}
