import { Module } from '@nestjs/common'
import { ConfigModule as NestConfigModule } from '@nestjs/config'
// import validationSchema from './config.validation'

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        '.env',
        `${process.env.NODE_ENV || 'development'}.env`,
        `apps/${process.env.SERVICE_KEY}/.env`,
        `apps/${process.env.SERVICE_KEY}/${process.env.NODE_ENV || 'development'}/.env`
      ],
      // validationSchema,
      validationOptions: {
        allowUnknown: false,
        abortEarly: true
      }
    })
  ]
})
export class ConfigModule {}
