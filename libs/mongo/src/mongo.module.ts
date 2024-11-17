import { ConfigModule, ConfigService, EnvironmentVariables } from '@app/config'
import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forRootAsync({
      useFactory: async (
        configService: ConfigService<EnvironmentVariables>
      ) => ({
        uri: configService.get<string>('MONGO_URI')
      })
    })
  ]
})
export class MongoModule {}
