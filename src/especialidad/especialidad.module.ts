import { Module } from '@nestjs/common';
import { EspecialidadService } from './especialidad.service';
import { EspecialidadController } from './especialidad.controller';
import { Especialidad } from 'src/entities/especialidad.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Especialidad]),
  ],
  controllers: [EspecialidadController],
  providers: [EspecialidadService],
})
export class EspecialidadModule { }
