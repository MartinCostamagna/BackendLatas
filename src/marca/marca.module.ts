import { Module } from '@nestjs/common';
import { MarcaService } from './marca.service';
import { MarcaController } from './marca.controller';
import { Marca } from 'src/entities/marca.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Marca]),
  ],
  controllers: [MarcaController],
  providers: [MarcaService],
})
export class MarcaModule { }
