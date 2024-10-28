import { Module } from '@nestjs/common'
import { GatewayController } from './gateway.controller'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { join } from 'path'

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'PRODUCT_PACKAGE',
        transport: Transport.GRPC,
        options: {
          url: '127.0.0.1:10087',
          package: 'product',
          protoPath: join(process.cwd(), 'proto/product.proto'),
          loader: {
            includeDirs: [process.cwd(), 'proto']
          }
        }
      },
      {
        name: 'ORDER_PACKAGE',
        transport: Transport.GRPC,
        options: {
          url: '127.0.0.1:10088',
          package: 'order',
          protoPath: [join(process.cwd(), 'proto/order.proto')],
          loader: {
            includeDirs: [process.cwd(), 'proto']
          }
        }
      }
    ])
  ],
  controllers: [GatewayController]
})
export class GatewayModule {}
