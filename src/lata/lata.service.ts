import { Injectable } from '@nestjs/common';
import { CreateLataDto } from './dto/create-lata.dto';
import { UpdateLataDto } from './dto/update-lata.dto';

@Injectable()
export class LataService {
  create(createLataDto: CreateLataDto) {
    return 'This action adds a new lata';
  }

  findAll() {
    return `This action returns all lata`;
  }

  findOne(id: number) {
    return `This action returns a #${id} lata`;
  }

  update(id: number, updateLataDto: UpdateLataDto) {
    return `This action updates a #${id} lata`;
  }

  remove(id: number) {
    return `This action removes a #${id} lata`;
  }
}
