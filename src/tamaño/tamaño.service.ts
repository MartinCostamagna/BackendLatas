import { Injectable } from '@nestjs/common';
import { CreateTamañoDto } from './dto/create-tamaño.dto';
import { UpdateTamañoDto } from './dto/update-tamaño.dto';

@Injectable()
export class TamañoService {
  create(createTamañoDto: CreateTamañoDto) {
    return 'This action adds a new tamaño';
  }

  findAll() {
    return `This action returns all tamaño`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tamaño`;
  }

  update(id: number, updateTamañoDto: UpdateTamañoDto) {
    return `This action updates a #${id} tamaño`;
  }

  remove(id: number) {
    return `This action removes a #${id} tamaño`;
  }
}
