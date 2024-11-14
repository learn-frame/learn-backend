import { ecsFormat } from '@elastic/ecs-winston-format'
import 'dotenv/config'
import { WinstonModule } from 'nest-winston'
import * as winston from 'winston'
import DailyRotateFile from 'winston-daily-rotate-file'
import { ElasticsearchTransport } from 'winston-elasticsearch'
import elasticsearchTransportOptions from './elasticsearch.config'

export default WinstonModule.createLogger({
  instance: winston.createLogger({
    level: 'info',
    format: ecsFormat(),
    transports: [
      new DailyRotateFile({
        level: 'debug',
        datePattern: 'YYYY-MM-DD-HH',
        filename: 'application-%DATE%.log',
        dirname: 'logs',
        maxSize: '20m',
        maxFiles: '30d',
        zippedArchive: true
      }),
      new DailyRotateFile({
        level: 'error',
        datePattern: 'YYYY-MM-DD-HH',
        filename: 'error-%DATE%.log',
        dirname: 'logs',
        maxSize: '20m',
        maxFiles: '30d'
      }),
      // new KafkaTransport({
      //   clientId: 'winston-kafka-logger',
      //   brokers: ['localhost:9092'],
      //   topic: 'logs-topic'
      // })
      new ElasticsearchTransport(elasticsearchTransportOptions)
    ]
  })
})
