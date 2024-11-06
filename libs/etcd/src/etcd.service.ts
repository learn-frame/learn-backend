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
import { ServiceInfo } from './etcd.module'

@Injectable()
export class EtcdService implements OnModuleInit, OnModuleDestroy {
  private workLoopId: NodeJS.Timeout

  constructor(
    @Inject('ETCD_CLIENT') private client: Etcd3,
    @Inject('SERVICE_INFO') private serviceInfo: ServiceInfo,
    private configService: ConfigService<EnvironmentVariables>
  ) {}

  async onModuleInit() {
    await this.client
      .put(
        `/${this.serviceInfo.serviceKey}/${this.serviceInfo.host}:${this.serviceInfo.port}`
      )
      .value(`${this.serviceInfo.host}:${this.serviceInfo.port}`)

    this._workLoopOnMainThread()
  }

  async onModuleDestroy() {
    await this.client
      .delete()
      .key(
        `/${this.serviceInfo.serviceKey}/${this.serviceInfo.host}:${this.serviceInfo.port}`
      )
    console.log('EtcdService destroyed')
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

  async watchServiceChanges() {
    const watcher = await this.client
      .watch()
      .prefix(`${this.serviceInfo.serviceKey}`)
      .create()

    watcher.on('put', async () => {
      const services = await this.discoverServices(this.serviceInfo.serviceKey)
      this.refreshService(services)
      this.restartWorkLoop()
    })

    watcher.on('delete', async () => {
      const services = await this.discoverServices(this.serviceInfo.serviceKey)
      this.refreshService(services)
      this.restartWorkLoop()
    })
  }

  refreshService(services: string[]) {
    process.env[`ETCD_${this.serviceInfo.serviceKey}`] =
      JSON.stringify(services)
  }

  restartWorkLoop() {
    clearInterval(this.workLoopId)
    this._workLoopOnMainThread()
  }

  // TODO: refreshing etcd should work on worker thread.
  _workLoopOnMainThread() {
    this.workLoopId = setInterval(async () => {
      const services = await this.discoverServices(this.serviceInfo.serviceKey)
      this.refreshService(services)
    }, 30 * 1000)
  }

  startWorker() {
    if (isMainThread) {
      const worker = new Worker(__filename)
      worker.on('message', (services: string[]) => {
        this.refreshService(services)
      })
    }
  }

  workLoop() {
    if (!isMainThread) {
      this.workLoopId = setInterval(() => {
        const response = this.discoverServices(this.serviceInfo.serviceKey)
        parentPort.postMessage(response)
      }, 30 * 1000)
    }
  }
}
