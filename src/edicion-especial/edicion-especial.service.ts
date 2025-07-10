import { Injectable } from '@nestjs/common';
import { CreateEdicionEspecialDto } from './dto/create-edicion-especial.dto';
import { UpdateEdicionEspecialDto } from './dto/update-edicion-especial.dto';

@Injectable()
export class EdicionEspecialService {
  create(createEdicionEspecialDto: CreateEdicionEspecialDto) {
    return 'This action adds a new edicionEspecial';
  }

  findAll() {
    return `This action returns all edicionEspecial`;
  }

  findOne(id: number) {
    return `This action returns a #${id} edicionEspecial`;
  }

  update(id: number, updateEdicionEspecialDto: UpdateEdicionEspecialDto) {
    return `This action updates a #${id} edicionEspecial`;
  }

  remove(id: number) {
    return `This action removes a #${id} edicionEspecial`;
  }
}
