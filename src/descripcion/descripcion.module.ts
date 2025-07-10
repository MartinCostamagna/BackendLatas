import { Module } from '@nestjs/common';
import { DescripcionService } from './descripcion.service';
import { DescripcionController } from './descripcion.controller';

@Module({
  controllers: [DescripcionController],
  providers: [DescripcionService],
})
export class DescripcionModule {}
