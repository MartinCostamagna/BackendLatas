import { Module } from '@nestjs/common';
import { LataService } from './lata.service';
import { LataController } from './lata.controller';
import { Lata } from 'src/entities/lata.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Lata]),
  ],
  controllers: [LataController],
  providers: [LataService],
})
export class LataModule { }
