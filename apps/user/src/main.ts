process.env.SERVICE_KEY = 'user'

import { NestFactory } from '@nestjs/core'
import { UserModule } from './user.module'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { join } from 'path'
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston'

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UserModule,
    {
      transport: Transport.GRPC,
      options: {
        package: process.env.SERVICE_KEY,
        protoPath: join(process.cwd(), 'proto/user.proto'),
        url: `${process.env.HOST}:${process.env.PORT}`
      }
    }
  )

  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER))
  await app.listen()
}
bootstrap()
