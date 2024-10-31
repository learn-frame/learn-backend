import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Inject
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Etcd3 } from 'etcd3'
import { EnvironmentVariables } from '@app/config'

@Injectable()
export class EtcdService implements OnModuleInit, OnModuleDestroy {
  private serviceKey: string
  private serviceValue: string
  

  constructor(@Inject('ETCD_CLIENT') private client: Etcd3, private configService: ConfigService<EnvironmentVariables>) {
    const serviceKey = this.configService.get('SERVICE_KEY')
    const serviceValue = this.configService.get('SERVICE_VALUE')
    this.serviceKey = serviceKey
    this.serviceValue = serviceValue
  }

  async onModuleInit() {
    await this.client.put(this.serviceKey).value(this.serviceValue)
    console.log('EtcdService initialized')
  }

  async onModuleDestroy() {
    await this.client.delete().key(this.serviceKey)
    console.log('EtcdService destroyed')
  }

  async get(serviceKey: string): Promise<string> {
    return await this.client.get(serviceKey).string()
  }

  async put(serviceKey: string, serviceValue: string): Promise<void> {
    await this.client.put(serviceKey).value(serviceValue)
  }

  async delete(serviceKey: string): Promise<void> {
    await this.client.delete().key(serviceKey)
  }

  async register(serviceKey: string, instanceId: string, metadata: any) {
    const key = `/services/${serviceKey}/${instanceId}`
    const lease = this.client.lease(10)
    await lease.put(key).value(JSON.stringify(metadata))
    lease.on('lost', async () => {
      await this.register(serviceKey, instanceId, metadata)
    })
  }

  async discover(serviceKey: string) {
    const instances = await this.client
      .getAll()
      .prefix(`/services/${serviceKey}`)
      .strings()
    return Object.entries(instances).map(([_, value]) => JSON.parse(value))
  }

  async watch(serviceKey: string, callback: Function) {
    const watcher = await this.client
      .watch()
      .prefix(`/services/${serviceKey}`)
      .create()
    watcher
      .on('put', async (event) => {
        console.log(event.key.toString())
        callback(await this.discover(serviceKey))
      })
      .on('delete', async (event) => {
        console.log(event.key.toString())
        callback(await this.discover(serviceKey))
      })
  }
}
