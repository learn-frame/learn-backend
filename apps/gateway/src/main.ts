import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { GatewayModule } from './gateway.module'
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston'

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule)
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER))

  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build()
  const documentFactory = () => SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, documentFactory)

  await app.listen(process.env.PORT)
}
bootstrap()
