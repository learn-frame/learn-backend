import { Module } from '@nestjs/common'
import { ProductsController } from './products.controller'
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
          protoPath: join(process.cwd(), 'proto/product.proto')
        }
      }
    ])
  ],
  controllers: [ProductsController]
})
export class ProductsModule {}
