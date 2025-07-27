import { Module } from '@nestjs/common';
import { DescripcionService } from './descripcion.service';
import { DescripcionController } from './descripcion.controller';
import { Descripcion } from 'src/entities/descripcion.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Descripcion]),
  ],
  controllers: [DescripcionController],
  providers: [DescripcionService],
})
export class DescripcionModule { }
