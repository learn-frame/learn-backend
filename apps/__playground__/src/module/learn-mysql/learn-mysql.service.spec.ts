import { Test, TestingModule } from '@nestjs/testing'
import { LearnMysqlService } from './learn-mysql.service'

describe('LearnMysqlService', () => {
  let service: LearnMysqlService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LearnMysqlService]
    }).compile()

    service = module.get<LearnMysqlService>(LearnMysqlService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
