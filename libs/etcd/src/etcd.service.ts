import { ConfigService, EnvironmentVariables } from '@app/config'
import {
  Inject,
  Injectable,
  OnModuleDestroy,
  OnModuleInit
} from '@nestjs/common'
import { Etcd3 } from 'etcd3'
import { Worker, isMainThread, parentPort } from 'node:worker_threads'
import { ServiceInfo } from './etcd.module'

@Injectable()
// eslint-disable-next-line @darraghor/nestjs-typed/injectable-should-be-provided
export class EtcdService implements OnModuleInit, OnModuleDestroy {
  private workLoopId: NodeJS.Timeout

  constructor(
    private configService: ConfigService<EnvironmentVariables>,
    @Inject('ETCD_CLIENT') private client: Etcd3,
    @Inject('SERVICE_INFO') private serviceInfo?: ServiceInfo
  ) {}

  async onModuleInit() {
    if (!this.serviceInfo) return

    await this.client
      .put(
        `/${this.serviceInfo.serviceKey}/${this.serviceInfo.host}:${this.serviceInfo.port}`
      )
      .value(`${this.serviceInfo.host}:${this.serviceInfo.port}`)

    this._workLoopOnMainThread()
  }

  async onModuleDestroy() {
    if (!this.serviceInfo) return

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
    } catch {
      return []
    }
  }

  async watchServiceChanges() {
    if (!this.serviceInfo) return

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
    if (!this.serviceInfo) return

    process.env[`ETCD_${this.serviceInfo.serviceKey}`] =
      JSON.stringify(services)
  }

  restartWorkLoop() {
    clearInterval(this.workLoopId)
    this._workLoopOnMainThread()
  }

  // TODO: refreshing etcd should work on worker thread.
  _workLoopOnMainThread() {
    if (!this.serviceInfo) return

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
    if (!this.serviceInfo) return
    if (!isMainThread) {
      this.workLoopId = setInterval(() => {
        const response = this.discoverServices(this.serviceInfo.serviceKey)
        parentPort.postMessage(response)
      }, 30 * 1000)
    }
  }
}
