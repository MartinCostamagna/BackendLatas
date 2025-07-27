import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sabor } from 'src/entities/sabor.entity';
import { CreateSaborDto } from '../dto/create-sabor.dto';
import { UpdateSaborDto } from '../dto/update-sabor.dto';

@Injectable()
export class SaborService {
  constructor(
    @InjectRepository(Sabor)
    private readonly saborRepository: Repository<Sabor>,
  ) { }

  async create(createSaborDto: CreateSaborDto): Promise<Sabor> {
    const nuevoSabor = this.saborRepository.create(createSaborDto);
    return this.saborRepository.save(nuevoSabor);
  }

  async findAll(): Promise<Sabor[]> {
    return this.saborRepository.find();
  }

  async findOne(id: number): Promise<Sabor> {
    const sabor = await this.saborRepository.findOneBy({ id });
    if (!sabor) {
      throw new NotFoundException(`El sabor con el ID ${id} no fue encontrado.`);
    }
    return sabor;
  }

  async update(id: number, updateSaborDto: UpdateSaborDto): Promise<Sabor> {
    const sabor = await this.findOne(id);
    const saborActualizado = await this.saborRepository.preload({
      id: sabor.id,
      ...updateSaborDto,
    });

    if (!saborActualizado) {
      throw new NotFoundException(`El sabor con el ID ${id} no fue encontrado.`);
    }

    return this.saborRepository.save(saborActualizado);
  }

  async remove(id: number): Promise<void> {
    const sabor = await this.findOne(id);
    await this.saborRepository.remove(sabor);
  }
}
