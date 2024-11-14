import LoggerModule from '@app/logger'
import { NestFactory } from '@nestjs/core'
import { GatewayModule } from './gateway.module'

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule, { logger: LoggerModule })
  await app.listen(10086)
}
bootstrap()
