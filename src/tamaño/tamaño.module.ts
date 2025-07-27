import { Module } from '@nestjs/common';
import { TamañoService } from './tamaño.service';
import { TamañoController } from './tamaño.controller';
import { Tamaño } from 'src/entities/tamaño.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tamaño]),
  ],
  controllers: [TamañoController],
  providers: [TamañoService],
})
export class TamañoModule { }
