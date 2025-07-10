import { Injectable } from '@nestjs/common';
import { CreateDescripcionDto } from './dto/create-descripcion.dto';
import { UpdateDescripcionDto } from './dto/update-descripcion.dto';

@Injectable()
export class DescripcionService {
  create(createDescripcionDto: CreateDescripcionDto) {
    return 'This action adds a new descripcion';
  }

  findAll() {
    return `This action returns all descripcion`;
  }

  findOne(id: number) {
    return `This action returns a #${id} descripcion`;
  }

  update(id: number, updateDescripcionDto: UpdateDescripcionDto) {
    return `This action updates a #${id} descripcion`;
  }

  remove(id: number) {
    return `This action removes a #${id} descripcion`;
  }
}
