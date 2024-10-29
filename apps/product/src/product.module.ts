import { Module } from '@nestjs/common'
import { ProductController } from './product.controller'
import { ProductService } from './product.service'
import { PrismaService } from './prisma.service'
import { EtcdModule } from '@app/etcd'
import { RabbitMqModule } from '@app/rabbit-mq'

@Module({
  imports: [EtcdModule, RabbitMqModule],
  controllers: [ProductController],
  providers: [ProductService, PrismaService]
})
export class ProductModule {}
