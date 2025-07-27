import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Marca } from 'src/entities/marca.entity';
import { CreateMarcaDto } from '../dto/create-marca.dto';
import { UpdateMarcaDto } from '../dto/update-marca.dto';

@Injectable()
export class MarcaService {
  constructor(
    @InjectRepository(Marca)
    private readonly marcaRepository: Repository<Marca>,
  ) { }
  async create(createMarcaDto: CreateMarcaDto): Promise<Marca> {
    const nuevaMarca = this.marcaRepository.create(createMarcaDto);
    return this.marcaRepository.save(nuevaMarca);
  }

  async findAll(): Promise<Marca[]> {
    return this.marcaRepository.find();
  }

  async findOne(id: number): Promise<Marca> {
    const marca = await this.marcaRepository.findOneBy({ id });
    if (!marca) {
      throw new NotFoundException(`La marca con el ID ${id} no fue encontrada.`);
    }
    return marca;
  }

  async update(id: number, updateMarcaDto: UpdateMarcaDto): Promise<Marca> {
    const marca = await this.findOne(id);
    const marcaActualizada = await this.marcaRepository.preload({
      id: marca.id,
      ...updateMarcaDto,
    });

    if (!marcaActualizada) {
      throw new NotFoundException(`La marca con el ID ${id} no fue encontrada.`);
    }

    return this.marcaRepository.save(marcaActualizada);
  }

  async remove(id: number): Promise<void> {
    const marca = await this.findOne(id);
    await this.marcaRepository.remove(marca);
  }
}
