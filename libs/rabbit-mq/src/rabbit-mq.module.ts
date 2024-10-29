import { Module } from '@nestjs/common'
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
  exports: [RabbitMQModule]
})
export class RabbitMqModule {}
