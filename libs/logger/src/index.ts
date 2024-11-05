import { WinstonModule } from 'nest-winston'
import instance from './logger.config'

export default WinstonModule.createLogger({
  instance
})
