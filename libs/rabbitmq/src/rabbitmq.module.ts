import { ConfigModule, ConfigService, EnvironmentVariables } from '@app/config'
import { RabbitMQModule as NestRabbitMQModule } from '@golevelup/nestjs-rabbitmq'
import { Module } from '@nestjs/common'

@Module({
  imports: [
    ConfigModule,
    NestRabbitMQModule.forRootAsync(NestRabbitMQModule, {
      useFactory: async (
        configService: ConfigService<EnvironmentVariables>
      ) => ({
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
  exports: [NestRabbitMQModule]
})
export class RabbitMQModule {}
