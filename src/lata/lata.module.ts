import { Module } from '@nestjs/common';
import { LataService } from './lata.service';
import { LataController } from './lata.controller';
import { Lata } from 'src/entities/lata.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Caja } from 'src/entities/caja.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Lata, Caja]),
  ],
  controllers: [LataController],
  providers: [LataService],
})
export class LataModule { }
