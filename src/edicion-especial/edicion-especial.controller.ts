import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EdicionEspecialService } from './edicion-especial.service';
import { CreateEdicionEspecialDto } from '../dto/create-edicion-especial.dto';
import { UpdateEdicionEspecialDto } from '../dto/update-edicion-especial.dto';
import { Public } from 'src/auth/public.decorator';

@Controller('ediciones-especiales')
export class EdicionEspecialController {
  constructor(private readonly edicionEspecialService: EdicionEspecialService) { }

  @Post()
  create(@Body() createEdicionEspecialDto: CreateEdicionEspecialDto) {
    return this.edicionEspecialService.create(createEdicionEspecialDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.edicionEspecialService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.edicionEspecialService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEdicionEspecialDto: UpdateEdicionEspecialDto) {
    return this.edicionEspecialService.update(+id, updateEdicionEspecialDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.edicionEspecialService.remove(+id);
  }
}
