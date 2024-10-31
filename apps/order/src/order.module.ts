import { Module } from '@nestjs/common'
import { OrderController } from './order.controller'
import { OrderService } from './order.service'
import { RabbitMqModule } from '@app/rabbit-mq'
import { EtcdModule } from '@app/etcd'
import { PrismaModule } from '@app/prisma'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [ConfigModule, EtcdModule, RabbitMqModule, PrismaModule],
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule {}
