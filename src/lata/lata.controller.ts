import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LataService } from './lata.service';
import { CreateLataDto } from './dto/create-lata.dto';
import { UpdateLataDto } from './dto/update-lata.dto';

@Controller('lata')
export class LataController {
  constructor(private readonly lataService: LataService) {}

  @Post()
  create(@Body() createLataDto: CreateLataDto) {
    return this.lataService.create(createLataDto);
  }

  @Get()
  findAll() {
    return this.lataService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lataService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLataDto: UpdateLataDto) {
    return this.lataService.update(+id, updateLataDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lataService.remove(+id);
  }
}
