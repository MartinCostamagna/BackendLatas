import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseInterceptors, UploadedFiles, BadRequestException } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { LataNoTengoService } from './lata-no-tengo.service';
import { CreateLataNoTengoDto } from '../dto/create-lata-no-tengo.dto';
import { UpdateLataNoTengoDto } from '../dto/update-lata-no-tengo.dto';
import { Public } from 'src/auth/public.decorator';

@Controller('lata-no-tengo')
export class LataNoTengoController {
  constructor(private readonly lataNoTengoService: LataNoTengoService) { }

  @Post()
  @UseInterceptors(FilesInterceptor('foto', 1))
  async create(
    @Body() body: any,
    @UploadedFiles() files: any[]
  ) {
    if (!files || files.length === 0 || !files[0]) {
      throw new BadRequestException('La foto es obligatoria para registrar la lata que no tienes');
    }

    const rutasGuardadas = await this.lataNoTengoService.guardarArchivosFisicos(files);

    const payloadParseado = {
      nombre: body.nombre,
      estado: body.estado,
      foto1: rutasGuardadas[0] || '',
    };

    const dtoInstancia = plainToInstance(CreateLataNoTengoDto, payloadParseado);
    const errores = await validate(dtoInstancia);

    if (errores.length > 0) {
      const mensajes = errores.map(err => Object.values(err.constraints || {})).flat();
      throw new BadRequestException({ message: 'Validación Fallida', errors: mensajes });
    }

    return this.lataNoTengoService.create(dtoInstancia);
  }

  @Public()
  @Get()
  findAll() {
    return this.lataNoTengoService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.lataNoTengoService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateLataNoTengoDto: UpdateLataNoTengoDto,
  ) {
    return this.lataNoTengoService.update(id, updateLataNoTengoDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.lataNoTengoService.remove(id);
  }
}