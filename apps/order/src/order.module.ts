import { ConfigModule } from '@app/config'
import { PrismaModule } from '@app/prisma'
import { RabbitMQModule } from '@app/rabbitmq'
import { Logger, Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { join } from 'path'
import { OrderController } from './order.controller'
import { OrderService } from './order.service'

@Module({
  imports: [
    ConfigModule,
    RabbitMQModule,
    PrismaModule,
    ClientsModule.register([
      {
        name: 'PRODUCT_SERVICE',
        transport: Transport.GRPC,
        options: {
          url:
            process.env.NODE_ENV === 'production'
              ? 'order-service:10088'
              : 'localhost:10088',
          package: 'product',
          protoPath: join(process.cwd(), 'proto/product.proto'),
          loader: {
            includeDirs: [process.cwd(), 'proto']
          }
        }
      }
    ])
  ],
  controllers: [OrderController],
  providers: [OrderService, Logger]
})
export class OrderModule {}
