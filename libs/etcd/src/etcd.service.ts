import { EnvironmentVariables } from '@app/config'
import {
  Inject,
  Injectable,
  OnModuleDestroy,
  OnModuleInit
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Etcd3 } from 'etcd3'
import { Worker, isMainThread, parentPort } from 'node:worker_threads'

@Injectable()
export class EtcdService implements OnModuleInit, OnModuleDestroy {
  private serviceKey: string
  private host: string
  private port: string
  private workLoopId: NodeJS.Timeout

  constructor(
    @Inject('ETCD_CLIENT') private client: Etcd3,
    private configService: ConfigService<EnvironmentVariables>
  ) {
    this.serviceKey = this.configService.get<string>('SERVICE_KEY')
    this.host = this.configService.get<string>('HOST')
    this.port = this.configService.get<string>('PORT')
  }

  async onModuleInit() {
    if (this.serviceKey) {
      await this.client
        .put(`/${this.serviceKey}/${this.host}:${this.port}`)
        .value(`${this.host}:${this.port}`)

      this.startWorker()
    }
  }

  async onModuleDestroy() {
    if (this.serviceKey) {
      await this.client
        .delete()
        .key(`/${this.serviceKey}/${this.host}:${this.port}`)
      console.log('EtcdService destroyed')
    }
  }

  async discoverServices(serviceName: string): Promise<string[]> {
    try {
      const result = await this.client
        .getAll()
        .prefix(`/${serviceName}/`)
        .strings()

      return Object.values(result)
    } catch (error) {
      return []
    }
  }

  async watchServiceChanges(serviceName: string) {
    const watcher = await this.client.watch().prefix(`${serviceName}`).create()

    watcher.on('put', async () => {
      const services = await this.discoverServices(serviceName)
      this.refreshService(services)
      this.restartWorkLoop()
    })

    watcher.on('delete', async () => {
      const services = await this.discoverServices(serviceName)
      this.refreshService(services)
      this.restartWorkLoop()
    })
  }

  refreshService(services: string[]) {
    if (this.serviceKey) {
      process.env[`ETCD_${this.serviceKey}`] = JSON.stringify(services)
    }
  }

  restartWorkLoop() {
    clearInterval(this.workLoopId)

    if (this.serviceKey) {
      this.workLoop(this.serviceKey)
    }
  }

  startWorker() {
    if (isMainThread) {
      const worker = new Worker(__filename)
      worker.on('message', (services: string[]) => {
        this.refreshService(services)
      })
    }
  }

  workLoop(serviceName: string) {
    if (!isMainThread) {
      this.workLoopId = setInterval(() => {
        const response = this.discoverServices(serviceName)
        parentPort.postMessage(response)
      }, 30 * 1000)
    }
  }
}
