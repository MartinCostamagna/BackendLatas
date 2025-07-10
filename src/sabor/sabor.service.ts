import { Injectable } from '@nestjs/common';
import { CreateSaborDto } from './dto/create-sabor.dto';
import { UpdateSaborDto } from './dto/update-sabor.dto';

@Injectable()
export class SaborService {
  create(createSaborDto: CreateSaborDto) {
    return 'This action adds a new sabor';
  }

  findAll() {
    return `This action returns all sabor`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sabor`;
  }

  update(id: number, updateSaborDto: UpdateSaborDto) {
    return `This action updates a #${id} sabor`;
  }

  remove(id: number) {
    return `This action removes a #${id} sabor`;
  }
}
