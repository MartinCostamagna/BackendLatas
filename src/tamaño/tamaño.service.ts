import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tamaño } from 'src/entities/tamaño.entity';
import { CreateTamañoDto } from '../dto/create-tamaño.dto';
import { UpdateTamañoDto } from '../dto/update-tamaño.dto';

@Injectable()
export class TamañoService {
  constructor(
    @InjectRepository(Tamaño)
    private readonly tamañoRepository: Repository<Tamaño>,
  ) { }

  async create(createTamañoDto: CreateTamañoDto): Promise<Tamaño> {
    const nuevoTamaño = this.tamañoRepository.create(createTamañoDto);
    return this.tamañoRepository.save(nuevoTamaño);
  }

  async findAll(): Promise<Tamaño[]> {
    return this.tamañoRepository.find();
  }

  async findOne(id: number): Promise<Tamaño> {
    const tamaño = await this.tamañoRepository.findOneBy({ id });
    if (!tamaño) {
      throw new NotFoundException(`El tamaño con el ID ${id} no fue encontrado.`);
    }
    return tamaño;
  }

  async update(id: number, updateTamañoDto: UpdateTamañoDto): Promise<Tamaño> {
    const tamaño = await this.findOne(id);
    const tamañoActualizado = await this.tamañoRepository.preload({
      id: tamaño.id,
      ...updateTamañoDto,
    });

    if (!tamañoActualizado) {
      throw new NotFoundException(`El tamaño con el ID ${id} no fue encontrado.`);
    }

    return this.tamañoRepository.save(tamañoActualizado);
  }

  async remove(id: number): Promise<void> {
    const tamaño = await this.findOne(id);
    await this.tamañoRepository.remove(tamaño);
  }
}
