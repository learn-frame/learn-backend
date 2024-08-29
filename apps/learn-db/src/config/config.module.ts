import { Global, Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { createClient } from 'redis';

@Global()
@Module({
  imports: [NestConfigModule.forRoot()],
  providers: [
    {
      provide: 'REDIS_CLIENT',
      useFactory: async () => {
        const redis = await createClient({
          url: 'redis://localhost:6379',
        })
          .on('error', (err) => console.log('Redis Client Error', err))
          .connect();

        return redis;
      },
    },
  ],
  exports: ['REDIS_CLIENT'],
})
export class ConfigModule {}
