import { Module } from '@nestjs/common'
import { Etcd3 } from 'etcd3'

@Module({
  providers: [
    {
      provide: 'ETCD_CLIENT',
      useFactory() {
        const client = new Etcd3({
          hosts: ['http://localhost:2379']
          // auth: {
          //   username: '',
          //   password: ''
          // }
        })

        return client
      }
    }
  ]
})
export class EtcdModule {}
