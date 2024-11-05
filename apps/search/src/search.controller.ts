import { Controller, Get, Logger } from '@nestjs/common'
import { SearchService } from './search.service'

@Controller()
export class SearchController {
  constructor(
    private readonly searchService: SearchService,
    private readonly logger: Logger
  ) {}

  @Get()
  getHello(): string {
    return this.searchService.getHello()
  }
}
