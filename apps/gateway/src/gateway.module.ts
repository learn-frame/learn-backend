import { EtcdModule, EtcdService } from '@app/etcd'
import { Logger, Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { join } from 'path'
import { getRandomInt } from 'yancey-js-util'
import { GatewayController } from './gateway.controller'

@Module({
  imports: [
    ConfigModule,
    ClientsModule.registerAsync([
      {
        imports: [
          EtcdModule.register({
            serviceKey: 'product',
            host: 'localhost',
            port: 10091
          })
        ],
        name: 'PRODUCT_PACKAGE',
        inject: [ConfigService, EtcdService],
        useFactory: async (
          configService: ConfigService,
          etcdService: EtcdService
        ) => {
          try {
            const availableServices =
              await etcdService.discoverServices('product')
            const selectedService =
              availableServices[getRandomInt(0, availableServices.length)]

            if (!selectedService) {
              throw new Error('')
            }

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
          } catch (e) {
            console.log(e)
          }
        }
      },
      {
        imports: [
          EtcdModule.register({
            serviceKey: 'order',
            host: 'localhost',
            port: 10088
          })
        ],
        name: 'ORDER_PACKAGE',
        inject: [ConfigService, EtcdService],
        useFactory: async (
          configService: ConfigService,
          etcdService: EtcdService
        ) => {
          try {
            const availableServices =
              await etcdService.discoverServices('order')
            const selectedService =
              availableServices[getRandomInt(0, availableServices.length)]

            if (!selectedService) {
              throw new Error('')
            }

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
          } catch (e) {
            console.log(e)
          }
        }
      }
    ])
  ],
  controllers: [GatewayController],
  providers: [Logger]
})
export class GatewayModule {}
