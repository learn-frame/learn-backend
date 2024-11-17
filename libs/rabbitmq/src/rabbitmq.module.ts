import { ConfigModule, ConfigService } from '@app/config'
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq'
import { Module } from '@nestjs/common'

@Module({
  imports: [
    ConfigModule,
    RabbitMQModule.forRootAsync(RabbitMQModule, {
      useFactory: async (configService: ConfigService) => ({
        exchanges: [{ name: 'MQ_SERVICE', type: 'topic' }],
        uri: configService.get<string>('RABBITMQ_URI'),
        connectionInitOptions: { wait: false },
        deserializer: (message: Buffer) => {
          return message
        },
        serializer: (msg: unknown) => {
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
