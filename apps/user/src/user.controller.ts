import { Controller, Get, Logger } from '@nestjs/common'
import { UserService } from './user.service'

@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly logger: Logger
  ) {}

  @Get()
  getHello(): string {
    return this.userService.getHello()
  }
}
