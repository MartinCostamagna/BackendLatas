import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Descripcion } from 'src/entities/descripcion.entity';
import { CreateDescripcionDto } from '../dto/create-descripcion.dto';
import { UpdateDescripcionDto } from '../dto/update-descripcion.dto';

@Injectable()
export class DescripcionService {
  constructor(
    @InjectRepository(Descripcion)
    private readonly descripcionRepository: Repository<Descripcion>,
  ) { }

  async create(createDescripcionDto: CreateDescripcionDto): Promise<Descripcion> {
    const nuevaDescripcion = this.descripcionRepository.create(createDescripcionDto);
    return this.descripcionRepository.save(nuevaDescripcion);
  }


  async findAll(): Promise<Descripcion[]> {
    return this.descripcionRepository.find();
  }

  async findOne(id: number): Promise<Descripcion> {
    const descripcion = await this.descripcionRepository.findOneBy({ id });
    if (!descripcion) {
      throw new NotFoundException(`La descripción con el ID ${id} no fue encontrada.`);
    }
    return descripcion;
  }

  async update(id: number, updateDescripcionDto: UpdateDescripcionDto): Promise<Descripcion> {
    const descripcion = await this.findOne(id);
    const descripcionActualizada = await this.descripcionRepository.preload({
      id: descripcion.id,
      ...updateDescripcionDto,
    });

    if (!descripcionActualizada) {
      throw new NotFoundException(`La descripción con el ID ${id} no fue encontrada.`);
    }

    return this.descripcionRepository.save(descripcionActualizada);
  }

  async remove(id: number): Promise<void> {
    const descripcion = await this.findOne(id);
    await this.descripcionRepository.remove(descripcion);
  }
}
