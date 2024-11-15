import { ConfigModule } from '@app/config'
import { PrismaModule } from '@app/prisma'
import { RabbitMqModule } from '@app/rabbitmq'
import { Logger, Module } from '@nestjs/common'
import { SearchController } from './search.controller'
import { SearchService } from './search.service'

@Module({
  imports: [ConfigModule, RabbitMqModule, PrismaModule],
  controllers: [SearchController],
  providers: [SearchService, Logger]
})
export class SearchModule {}
