import { PartialType } from '@nestjs/mapped-types'
import { CreateLearnMysqlDto } from './create-learn-mysql.dto'

export class UpdateLearnMysqlDto extends PartialType(CreateLearnMysqlDto) {}
