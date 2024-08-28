import { Injectable } from '@nestjs/common';
import { CreateLearnMysqlDto } from './dto/create-learn-mysql.dto';
import { UpdateLearnMysqlDto } from './dto/update-learn-mysql.dto';

@Injectable()
export class LearnMysqlService {
  create(createLearnMysqlDto: CreateLearnMysqlDto) {
    return 'This action adds a new learnMysql';
  }

  findAll() {
    return `This action returns all learnMysql`;
  }

  findOne(id: number) {
    return `This action returns a #${id} learnMysql`;
  }

  update(id: number, updateLearnMysqlDto: UpdateLearnMysqlDto) {
    return `This action updates a #${id} learnMysql`;
  }

  remove(id: number) {
    return `This action removes a #${id} learnMysql`;
  }
}
