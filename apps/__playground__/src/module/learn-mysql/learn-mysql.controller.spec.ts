import { Test, TestingModule } from '@nestjs/testing'
import { LearnMysqlController } from './learn-mysql.controller'
import { LearnMysqlService } from './learn-mysql.service'

describe('LearnMysqlController', () => {
  let controller: LearnMysqlController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LearnMysqlController],
      providers: [LearnMysqlService]
    }).compile()

    controller = module.get<LearnMysqlController>(LearnMysqlController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
