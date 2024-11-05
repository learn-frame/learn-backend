import LoggerModule from '@app/logger'
import { NestFactory } from '@nestjs/core'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { join } from 'path'
import { SearchModule } from './search.module'

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    SearchModule,
    {
      transport: Transport.GRPC,
      options: {
        package: 'search',
        protoPath: join(process.cwd(), 'proto/search.proto'),
        url: 'localhost:10092'
      },
      logger: LoggerModule
    }
  )

  await app.listen()
}
bootstrap()
