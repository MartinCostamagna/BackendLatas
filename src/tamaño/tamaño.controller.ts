import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TamañoService } from './tamaño.service';
import { CreateTamañoDto } from '../dto/create-tamaño.dto';
import { UpdateTamañoDto } from '../dto/update-tamaño.dto';

@Controller('tamanos')
export class TamañoController {
  constructor(private readonly tamañoService: TamañoService) { }

  @Post()
  create(@Body() createTamañoDto: CreateTamañoDto) {
    return this.tamañoService.create(createTamañoDto);
  }

  @Get()
  findAll() {
    return this.tamañoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tamañoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTamañoDto: UpdateTamañoDto) {
    return this.tamañoService.update(+id, updateTamañoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tamañoService.remove(+id);
  }
}
