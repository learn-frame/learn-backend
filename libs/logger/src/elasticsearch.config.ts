import { ElasticsearchTransportOptions } from 'winston-elasticsearch'

const elasticsearchTransportOptions: ElasticsearchTransportOptions = {
  level: 'info',
  indexPrefix: 'learn-backend-logging',
  indexSuffixPattern: 'YYYY-MM-DD',
  clientOpts: {
    node: [process.env.ELASTIC_SEARCH_NODE],
    maxRetries: 5,
    requestTimeout: 10000,
    sniffOnStart: false,
    // auth: {
    //   username: process.env.ELASTIC_SEARCH_USERNAME,
    //   password: process.env.ELASTIC_SEARCH_PASSWORD
    // },
    tls: { rejectUnauthorized: false }
  }
}

export default elasticsearchTransportOptions
