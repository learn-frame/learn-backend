import { EtcdModule } from '@app/etcd'
import { PrismaModule } from '@app/prisma'
import { RabbitMqModule } from '@app/rabbitmq'
import { Logger, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { OrderController } from './order.controller'
import { OrderService } from './order.service'

@Module({
  imports: [
    ConfigModule,
    EtcdModule.register({
      serviceKey: 'order',
      host: 'localhost',
      port: 10088
    }),
    RabbitMqModule,
    PrismaModule
  ],
  controllers: [OrderController],
  providers: [OrderService, Logger]
})
export class OrderModule {}
