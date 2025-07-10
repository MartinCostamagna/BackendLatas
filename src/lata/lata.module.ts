import { Module } from '@nestjs/common';
import { LataService } from './lata.service';
import { LataController } from './lata.controller';

@Module({
  controllers: [LataController],
  providers: [LataService],
})
export class LataModule {}
