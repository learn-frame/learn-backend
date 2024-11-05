import { NestFactory } from '@nestjs/core'
import { UserModule } from './user.module'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { join } from 'path'

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UserModule,
    {
      transport: Transport.GRPC,
      options: {
        package: 'user',
        protoPath: join(process.cwd(), 'proto/user.proto'),
        url: 'localhost:10090'
      }
    }
  )

  await app.listen()
}
bootstrap()
