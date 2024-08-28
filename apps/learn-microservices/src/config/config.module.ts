import { Global, Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import Redis from 'ioredis';

@Global()
@Module({
  imports: [NestConfigModule.forRoot()],
  providers: [
    {
      provide: 'REDIS_CLIENT',
      useFactory: () => {
        const redis = new Redis({
          host: 'localhost',
          port: 6379,
        });
        return redis;
      },
    },
  ],
  exports: ['REDIS_CLIENT'],
})
export class ConfigModule {}
