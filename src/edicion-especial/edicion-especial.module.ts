import { Module } from '@nestjs/common';
import { EdicionEspecialService } from './edicion-especial.service';
import { EdicionEspecialController } from './edicion-especial.controller';
import { EdicionEspecial } from 'src/entities/edicion-especial.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([EdicionEspecial]),
  ],
  controllers: [EdicionEspecialController],
  providers: [EdicionEspecialService],
})
export class EdicionEspecialModule { }
