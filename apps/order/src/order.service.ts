import { AmqpConnection, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq'
import { Metadata } from '@grpc/grpc-js'
import { Inject, Injectable } from '@nestjs/common'
import { ClientGrpc } from '@nestjs/microservices'
import { CreateOrderRequest, CreateOrderResponse } from 'types/proto/order'
import { ProductServiceController } from 'types/proto/product'

@Injectable()
export class OrderService {
  private productService: ProductServiceController

  constructor(
    private readonly amqpConnection: AmqpConnection,
    @Inject('PRODUCT_SERVICE') private productClient: ClientGrpc
  ) {}

  onModuleInit() {
    this.productService =
      this.productClient.getService<ProductServiceController>('ProductService')
  }

  async createOrder(request: CreateOrderRequest): Promise<CreateOrderResponse> {
    const result = await this.amqpConnection.publish(
      'MQ_SERVICE',
      'order_created',
      request
    )
    console.log(result)

    const metadata = new Metadata()
    const product = await this.productService.getProduct({ id: 'a' }, metadata)
    console.log(product)

    return {
      order: {
        id: 'order1',
        userId: 'userId1',
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
