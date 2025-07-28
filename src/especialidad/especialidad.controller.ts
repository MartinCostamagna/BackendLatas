import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EspecialidadService } from './especialidad.service';
import { CreateEspecialidadDto } from '../dto/create-especialidad.dto';
import { UpdateEspecialidadDto } from '../dto/update-especialidad.dto';
import { Public } from 'src/auth/public.decorator';

@Controller('especialidades')
export class EspecialidadController {
  constructor(private readonly especialidadService: EspecialidadService) { }

  @Post()
  create(@Body() createEspecialidadDto: CreateEspecialidadDto) {
    return this.especialidadService.create(createEspecialidadDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.especialidadService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.especialidadService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEspecialidadDto: UpdateEspecialidadDto) {
    return this.especialidadService.update(+id, updateEspecialidadDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.especialidadService.remove(+id);
  }
}
