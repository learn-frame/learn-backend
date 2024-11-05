import * as winston from 'winston'
import * as winstonDailyRotateFile from 'winston-daily-rotate-file'

const config = {
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    winston.format.errors({ stack: true }),
    winston.format.printf(
      (info) => `[${info.timestamp}] [${info.level}] ${info.message}`
    )
  ),
  transports: [
    new winstonDailyRotateFile({
      level: 'debug',
      datePattern: 'YYYY-MM-DD',
      filename: 'application-%DATE%.log',
      dirname: 'logs',
      maxSize: '20m',
      maxFiles: '30d'
    }),
    new winstonDailyRotateFile({
      level: 'error',
      datePattern: 'YYYY-MM-DD',
      filename: 'error-%DATE%.log',
      dirname: 'logs',
      maxSize: '20m',
      maxFiles: '30d'
    })
    // new KafkaTransport({
    //   clientId: 'winston-kafka-logger',
    //   brokers: ['localhost:9092'],
    //   topic: 'logs-topic'
    // })
  ]
}

export default winston.createLogger(config)
