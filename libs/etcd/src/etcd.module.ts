import { ConfigModule } from '@app/config'
import { Global, Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Etcd3 } from 'etcd3'
import { EtcdService } from './etcd.service'

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'ETCD_CLIENT',
      async useFactory(configService: ConfigService) {
        const client = new Etcd3({
          hosts: configService.get<string>('ETCD_HOSTS').split(',')
          // auth: {
          //   username: configService.get<string>('ETCD_USERNAME'),
          //   password: configService.get<string>('ETCD_PASSWORD')
          // }
        })

        return client
      },
      inject: [ConfigService]
    },
    EtcdService
  ],

  exports: [EtcdService]
})
export class EtcdModule {}
