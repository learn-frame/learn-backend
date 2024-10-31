import { Module } from '@nestjs/common'
import { GatewayController } from './gateway.controller'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { join } from 'path'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { EtcdModule, EtcdService } from '@app/etcd'

@Module({
  imports: [
    ConfigModule,
    EtcdModule,
    ClientsModule.registerAsync([
      {
        name: 'PRODUCT_PACKAGE',
        inject: [ConfigService, EtcdService],
        useFactory: async (
          configService: ConfigService,
          etcdService: EtcdService
        ) => {
          try {
            let selectedService = ''
            const availableServices =
              await etcdService.discoverServices('product')
            selectedService = availableServices[0]

            if (!selectedService) {
              throw new Error('')
            }

            await etcdService.watchServiceChanges('product', (instances) => {
              console.log('Service instances have changed:', instances)
            })

            return {
              transport: Transport.GRPC,
              options: {
                url: selectedService,
                package: 'product',
                protoPath: join(process.cwd(), 'proto/product.proto'),
                loader: {
                  includeDirs: [process.cwd(), 'proto']
                }
              }
            }
          } catch {}
        }
      },
      {
        name: 'ORDER_PACKAGE',
        inject: [ConfigService, EtcdService],
        useFactory: async (
          configService: ConfigService,
          etcdService: EtcdService
        ) => {
          try {
            let selectedService = ''
            const availableServices =
              await etcdService.discoverServices('order')
            selectedService = availableServices[0]

            if (!selectedService) {
              throw new Error('')
            }

            await etcdService.watchServiceChanges('order', (instances) => {
              console.log('Service instances have changed:', instances)
            })

            return {
              transport: Transport.GRPC,
              options: {
                url: selectedService,
                package: 'order',
                protoPath: join(process.cwd(), 'proto/order.proto'),
                loader: {
                  includeDirs: [process.cwd(), 'proto']
                }
              }
            }
          } catch {}
        }
      }
    ])
  ],
  controllers: [GatewayController]
})
export class GatewayModule {}
