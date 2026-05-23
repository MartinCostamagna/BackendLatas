import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles, BadRequestException } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { LataService } from './lata.service';
import { CreateLataDto } from '../dto/create-lata.dto';
import { UpdateLataDto } from '../dto/update-lata.dto';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { Public } from '../auth/public.decorator';

@Controller('latas')
export class LataController {
  constructor(private readonly lataService: LataService) { }

  @Post()
  @UseInterceptors(FilesInterceptor('fotos', 3))
  async registrarLata(
    @Body() body: any,
    @UploadedFiles() files: any[]
  ) {
    if (!files || files.length === 0 || !files[0]) {
      throw new BadRequestException('La foto 1 es obligatoria para registrar la lata');
    }

    const nombreMarca = body.nombreMarca || 'Genericas';
    const rutasGuardadas = await this.lataService.guardarArchivosFisicos(nombreMarca, files);

    const payloadParseado = {
      marcaId: body.marcaId ? parseInt(body.marcaId, 10) : undefined,
      tamañoId: body.tamanoId ? parseInt(body.tamanoId, 10) : undefined,
      saborId: body.saborId ? parseInt(body.saborId, 10) : undefined,
      especialidadId: body.especialidadId ? parseInt(body.especialidadId, 10) : undefined,
      edicionLimitada: body.edicionLimitada === 'true',
      edicionEspecialId: body.edicionEspecialId ? parseInt(body.edicionEspecialId, 10) : undefined,
      descripcionId: body.descripcionId ? parseInt(body.descripcionId, 10) : undefined,
      anio: body.anio ? parseInt(body.anio, 10) : undefined,
      paisId: body.paisId ? parseInt(body.paisId, 10) : undefined,
      numeroDeCaja: body.numeroDeCaja ? parseInt(body.numeroDeCaja, 10) : undefined,

      foto1: rutasGuardadas[0] || '',
      foto2: rutasGuardadas[1] || undefined,
      foto3: rutasGuardadas[2] || undefined,
    };

    const dtoInstancia = plainToInstance(CreateLataDto, payloadParseado);
    const errores = await validate(dtoInstancia);

    if (errores.length > 0) {
      const mensajes = errores.map(err => Object.values(err.constraints || {})).flat();
      throw new BadRequestException({ message: 'Validación Fallida', errors: mensajes });
    }

    return this.lataService.insertarLataEnBd(dtoInstancia);
  }


  @Public()
  @Get()
  findAll() {
    return this.lataService.findAll();
  }

  @Public()
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
