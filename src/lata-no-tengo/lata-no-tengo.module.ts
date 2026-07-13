import { Module } from '@nestjs/common';
import { LataNoTengoService } from './lata-no-tengo.service';
import { LataNoTengoController } from './lata-no-tengo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LataNoTengo } from 'src/entities/lata-no-tengo.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([LataNoTengo]),
  ],
  controllers: [LataNoTengoController],
  providers: [LataNoTengoService],
})
export class LataNoTengoModule { }
