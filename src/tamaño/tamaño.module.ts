import { Module } from '@nestjs/common';
import { TamañoService } from './tamaño.service';
import { TamañoController } from './tamaño.controller';

@Module({
  controllers: [TamañoController],
  providers: [TamañoService],
})
export class TamañoModule {}
