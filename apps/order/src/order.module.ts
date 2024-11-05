import { EtcdModule } from '@app/etcd'
import { PrismaModule } from '@app/prisma'
import { RabbitMqModule } from '@app/rabbit-mq'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { OrderController } from './order.controller'
import { OrderService } from './order.service'

@Module({
  imports: [ConfigModule, EtcdModule, RabbitMqModule, PrismaModule],
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule {}
