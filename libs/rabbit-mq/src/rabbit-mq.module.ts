import { Module } from '@nestjs/common'
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq'
import { ConfigService } from '@nestjs/config'

@Module({
  imports: [
    RabbitMQModule.forRootAsync(RabbitMQModule, {
      useFactory: async (configService: ConfigService) => ({
        exchanges: [{ name: 'MQ_SERVICE', type: 'topic' }],
        uri: configService.get<string>('RABBITMQ_URI'),
        connectionInitOptions: { wait: false },
        deserializer: (message: Buffer, msg: any) => {
          return message
        },
        serializer: (msg: any) => {
          const encodedMessage = JSON.stringify(msg)
          return Buffer.from(encodedMessage)
        }
      }),
      inject: [ConfigService]
    })
  ],
  exports: [RabbitMQModule]
})
export class RabbitMqModule {}
