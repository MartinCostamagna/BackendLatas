import { Module } from '@nestjs/common';
import { CajaService } from './caja.service';
import { CajaController } from './caja.controller';
import { Caja } from 'src/entities/caja.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Caja]),
  ],
  controllers: [CajaController],
  providers: [CajaService],
})
export class CajaModule { }
