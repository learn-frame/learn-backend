import { Injectable } from '@nestjs/common';
import { CreateLearnMysqlDto } from './dto/create-learn-mysql.dto';
import { UpdateLearnMysqlDto } from './dto/update-learn-mysql.dto';

@Injectable()
export class LearnMysqlService {
  create(createLearnMysqlDto: CreateLearnMysqlDto) {
    return createLearnMysqlDto;
  }

  findAll() {
    return `This action returns all learnMysql`;
  }

  findOne(id: number) {
    return `This action returns a #${id} learnMysql`;
  }

  update(id: number, updateLearnMysqlDto: UpdateLearnMysqlDto) {
    return updateLearnMysqlDto;
  }

  remove(id: number) {
    return `This action removes a #${id} learnMysql`;
  }
}
