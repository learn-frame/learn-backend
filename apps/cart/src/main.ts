import LoggerModule from '@app/logger'
import { NestFactory } from '@nestjs/core'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { join } from 'path'
import { CartModule } from './cart.module'

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    CartModule,
    {
      transport: Transport.GRPC,
      options: {
        package: 'cart',
        protoPath: join(process.cwd(), 'proto/cart.proto'),
        url: 'localhost:10089'
      },
      logger: LoggerModule
    }
  )
  await app.listen()
}
bootstrap()
