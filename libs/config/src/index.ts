import { ConfigService } from '@nestjs/config'
import { EnvironmentVariables } from './config.interface'
import { ConfigModule } from './config.module'

export { ConfigModule, ConfigService, EnvironmentVariables }
