import { ConfigModule, ConfigService, EnvironmentVariables } from '@app/config'
import { Module } from '@nestjs/common'
import { createClient } from 'redis'

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'REDIS_CLIENT',
      useFactory: async (
        configService: ConfigService<EnvironmentVariables>
      ) => {
        const redis = await createClient({
          url: configService.get<string>('REDIS_CLIENT')
        })
          .on('error', (err) => console.log('Redis Client Error', err))
          .connect()

        return redis
      },
      inject: [ConfigService]
    }
  ]
})
export class RedisModule {}
