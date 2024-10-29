import { Module } from '@nestjs/common'
import { OrderController } from './order.controller'
import { OrderService } from './order.service'
import { RabbitMqModule } from '@app/rabbit-mq'
import { EtcdModule } from '@app/etcd'

@Module({
  imports: [EtcdModule, RabbitMqModule],
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule {}
