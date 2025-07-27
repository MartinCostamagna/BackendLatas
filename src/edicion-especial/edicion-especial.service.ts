import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EdicionEspecial } from 'src/entities/edicion-especial.entity';
import { CreateEdicionEspecialDto } from '../dto/create-edicion-especial.dto';
import { UpdateEdicionEspecialDto } from '../dto/update-edicion-especial.dto';

@Injectable()
export class EdicionEspecialService {
  constructor(
    @InjectRepository(EdicionEspecial)
    private readonly edicionEspecialRepository: Repository<EdicionEspecial>,
  ) { }

  async create(createEdicionEspecialDto: CreateEdicionEspecialDto): Promise<EdicionEspecial> {
    const nuevaEdicionEspecial = this.edicionEspecialRepository.create(createEdicionEspecialDto);
    return this.edicionEspecialRepository.save(nuevaEdicionEspecial);
  }

  async findAll(): Promise<EdicionEspecial[]> {
    return this.edicionEspecialRepository.find();
  }

  async findOne(id: number): Promise<EdicionEspecial> {
    const edicionEspecial = await this.edicionEspecialRepository.findOneBy({ id });
    if (!edicionEspecial) {
      throw new NotFoundException(`La edición especial con el ID ${id} no fue encontrada.`);
    }
    return edicionEspecial;
  }

  async update(id: number, updateEdicionEspecialDto: UpdateEdicionEspecialDto): Promise<EdicionEspecial> {
    const edicionEspecial = await this.findOne(id);
    const edicionEspecialActualizada = await this.edicionEspecialRepository.preload({
      id: edicionEspecial.id,
      ...updateEdicionEspecialDto,
    });

    if (!edicionEspecialActualizada) {
      throw new NotFoundException(`La edición especial con el ID ${id} no fue encontrada.`);
    }

    return this.edicionEspecialRepository.save(edicionEspecialActualizada);
  }

  async remove(id: number): Promise<void> {
    const edicionEspecial = await this.findOne(id);
    await this.edicionEspecialRepository.remove(edicionEspecial);
  }
}
