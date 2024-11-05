import { ConfigModule } from '@app/config'
import { EtcdModule } from '@app/etcd'
import { PrismaModule } from '@app/prisma'
import { RabbitMqModule } from '@app/rabbit-mq'
import { Logger, Module } from '@nestjs/common'
import { SearchController } from './search.controller'
import { SearchService } from './search.service'

@Module({
  imports: [ConfigModule, EtcdModule, RabbitMqModule, PrismaModule],
  controllers: [SearchController],
  providers: [SearchService, Logger]
})
export class SearchModule {}
