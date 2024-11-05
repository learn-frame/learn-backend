import { ConfigModule } from '@app/config'
import { EtcdModule } from '@app/etcd'
import { PrismaModule } from '@app/prisma'
import { RabbitMqModule } from '@app/rabbit-mq'
import { Module } from '@nestjs/common'
import { ProductController } from './product.controller'
import { ProductService } from './product.service'

@Module({
  imports: [ConfigModule, EtcdModule, RabbitMqModule, PrismaModule],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule {}
