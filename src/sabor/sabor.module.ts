import { Module } from '@nestjs/common';
import { SaborService } from './sabor.service';
import { SaborController } from './sabor.controller';

@Module({
  controllers: [SaborController],
  providers: [SaborService],
})
export class SaborModule {}
