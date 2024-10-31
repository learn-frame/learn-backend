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
  private host: string
  private port: string

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
      console.log('EtcdService initialized')
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

  async watchServiceChanges(
    serviceName: string,
    callback: (instances: string[]) => void
  ) {
    const watcher = await this.client.watch().prefix(`${serviceName}`).create()

    watcher.on('put', async () => {
      const instances = await this.discoverServices(serviceName)
      callback(instances)
    })

    watcher.on('delete', async () => {
      const instances = await this.discoverServices(serviceName)
      callback(instances)
    })
  }
}
