import { Module } from '@nestjs/common'
import { OrderController } from './order.controller'
import { OrderService } from './order.service'
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq'

@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [{ name: 'MQ_SERVICE', type: 'topic' }],
      uri: 'amqp://guest:guest@127.0.0.1:5672',
      connectionInitOptions: { wait: false },
      deserializer: (message: Buffer, msg: any) => {
        return message
      },
      serializer: (msg: any) => {
        const encodedMessage = JSON.stringify(msg)
        return Buffer.from(encodedMessage)
      }
    })
  ],
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule {}
