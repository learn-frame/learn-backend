import { ConfigModule } from '@app/config'
import { DynamicModule, Global, Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Etcd3 } from 'etcd3'
import { EtcdService } from './etcd.service'

export interface ServiceInfo {
  serviceKey: string
  host: string
  port: number
}

@Global()
@Module({})
export class EtcdModule {
  static register(serviceInfo?: ServiceInfo): DynamicModule {
    return {
      imports: [ConfigModule],
      module: EtcdModule,
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
        EtcdService,
        {
          provide: 'SERVICE_INFO',
          useValue: serviceInfo
        }
      ],
      exports: [EtcdService]
    }
  }
}
