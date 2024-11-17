import { ecsFormat } from '@elastic/ecs-winston-format'
import chalk from 'chalk'
import 'dotenv/config'
import { WinstonModule } from 'nest-winston'
import * as winston from 'winston'
import DailyRotateFile from 'winston-daily-rotate-file'
import { ElasticsearchTransport } from 'winston-elasticsearch'
import { formatJSONDate } from 'yancey-js-util'
import { levelsColors } from './constant'
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
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.colorize({
            colors: levelsColors
          }),
          winston.format.printf((info) => {
            const symbols = Object.getOwnPropertySymbols(info)
            const level: string = info[symbols[0]]
            const color = levelsColors[level]
            const chalkColor = chalk[color]
            const logObj = JSON.parse(info[symbols[2]])
            const message = chalkColor(
              `[${level.toUpperCase()}] - ${formatJSONDate(logObj['@timestamp'])} [${logObj.context}] ${logObj.message}\n`
            )
            return message
          })
        ),
        level: 'debug'
      }),
      new ElasticsearchTransport(elasticsearchTransportOptions)
      // new KafkaTransport({
      //   clientId: 'winston-kafka-logger',
      //   brokers: ['localhost:9092'],
      //   topic: 'logs-topic'
      // })
    ]
  })
})
