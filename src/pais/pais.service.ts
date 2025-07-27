import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pais } from 'src/entities/pais.entity';
import { CreatePaisDto } from '../dto/create-pais.dto';
import { UpdatePaisDto } from '../dto/update-pais.dto';

@Injectable()
export class PaisService {
  constructor(
    @InjectRepository(Pais)
    private readonly paisRepository: Repository<Pais>,
  ) { }

  async create(createPaisDto: CreatePaisDto): Promise<Pais> {
    const nuevoPais = this.paisRepository.create(createPaisDto);
    return this.paisRepository.save(nuevoPais);
  }

  async findAll(): Promise<Pais[]> {
    return this.paisRepository.find();
  }

  async findOne(id: number): Promise<Pais> {
    const pais = await this.paisRepository.findOneBy({ id });
    if (!pais) {
      throw new NotFoundException(`El país con el ID ${id} no fue encontrado.`);
    }
    return pais;
  }

  async update(id: number, updatePaisDto: UpdatePaisDto): Promise<Pais> {
    const pais = await this.findOne(id);
    const paisActualizado = await this.paisRepository.preload({
      id: pais.id,
      ...updatePaisDto,
    });

    if (!paisActualizado) {
      throw new NotFoundException(`El país con el ID ${id} no fue encontrado.`);
    }

    return this.paisRepository.save(paisActualizado);
  }

  async remove(id: number): Promise<void> {
    const pais = await this.findOne(id);
    await this.paisRepository.remove(pais);
  }
}
