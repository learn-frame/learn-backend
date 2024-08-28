import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LearnMysqlService } from './learn-mysql.service';
import { CreateLearnMysqlDto } from './dto/create-learn-mysql.dto';
import { UpdateLearnMysqlDto } from './dto/update-learn-mysql.dto';

@Controller('learn-mysql')
export class LearnMysqlController {
  constructor(private readonly learnMysqlService: LearnMysqlService) {}

  @Post()
  create(@Body() createLearnMysqlDto: CreateLearnMysqlDto) {
    return this.learnMysqlService.create(createLearnMysqlDto);
  }

  @Get()
  findAll() {
    return this.learnMysqlService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.learnMysqlService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLearnMysqlDto: UpdateLearnMysqlDto) {
    return this.learnMysqlService.update(+id, updateLearnMysqlDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.learnMysqlService.remove(+id);
  }
}
