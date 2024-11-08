import { v4 } from 'uuid'
import { ElasticsearchTransportOptions } from 'winston-elasticsearch'

const elasticsearchTransportOptions: ElasticsearchTransportOptions = {
  level: 'error',
  indexPrefix: 'learn-backend-logging',
  indexSuffixPattern: 'YYYY-MM-DD',
  transformer: (logData) => {
    const spanId = v4()
    return {
      '@timestamp': new Date(),
      severity: logData.level,
      stack: logData.meta.stack,
      service_name: 'gateway',
      service_version: 'v1.0.0',
      message: `${logData.message}`,
      data: JSON.stringify(logData.meta.data),
      span_id: spanId,
      utcTimestamp: logData.timestamp
    }
  },
  clientOpts: {
    node: [process.env.ELASTIC_SEARCH_NODE],
    maxRetries: 5,
    requestTimeout: 10000,
    sniffOnStart: false,
    auth: {
      username: process.env.ELASTIC_SEARCH_USERNAME,
      password: process.env.ELASTIC_SEARCH_PASSWORD
    },
    tls: { rejectUnauthorized: false }
  }
}

export default elasticsearchTransportOptions
