import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DescripcionService } from './descripcion.service';
import { CreateDescripcionDto } from '../dto/create-descripcion.dto';
import { UpdateDescripcionDto } from '../dto/update-descripcion.dto';
import { Public } from '../auth/public.decorator';

@Controller('descripciones')
export class DescripcionController {
  constructor(private readonly descripcionService: DescripcionService) { }

  @Post()
  create(@Body() createDescripcionDto: CreateDescripcionDto) {
    return this.descripcionService.create(createDescripcionDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.descripcionService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.descripcionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDescripcionDto: UpdateDescripcionDto) {
    return this.descripcionService.update(+id, updateDescripcionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.descripcionService.remove(+id);
  }
}
