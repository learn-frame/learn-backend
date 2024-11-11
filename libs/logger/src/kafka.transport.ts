import { Kafka, KafkaConfig, Producer } from 'kafkajs'
import * as Transport from 'winston-transport'

interface KafkaTopic {
  topic: string
}

class KafkaTransport extends Transport {
  private kafka: Kafka
  private topic: string
  private producer: Producer

  constructor(
    opts: Transport.TransportStreamOptions & KafkaConfig & KafkaTopic
  ) {
    super(opts)
    this.topic = opts.topic || 'logs-topic'

    this.kafka = new Kafka({
      clientId: opts.clientId || 'winston-kafka-logger',
      brokers: opts.brokers || ['localhost:9092']
    })

    this.producer = this.kafka.producer()
    this.producer.connect()
  }

  async log(info: unknown, callback: () => void) {
    setImmediate(() => this.emit('logged', info))

    try {
      await this.producer.send({
        topic: this.topic,
        messages: [{ value: JSON.stringify(info) }]
      })
    } catch (error) {
     
    }

    callback()
  }
}

export default KafkaTransport
