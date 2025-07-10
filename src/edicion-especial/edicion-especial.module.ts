import { Module } from '@nestjs/common';
import { EdicionEspecialService } from './edicion-especial.service';
import { EdicionEspecialController } from './edicion-especial.controller';

@Module({
  controllers: [EdicionEspecialController],
  providers: [EdicionEspecialService],
})
export class EdicionEspecialModule {}
