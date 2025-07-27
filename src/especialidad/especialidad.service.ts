import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Especialidad } from 'src/entities/especialidad.entity';
import { CreateEspecialidadDto } from '../dto/create-especialidad.dto';
import { UpdateEspecialidadDto } from '../dto/update-especialidad.dto';

@Injectable()
export class EspecialidadService {
  constructor(
    @InjectRepository(Especialidad)
    private readonly especialidadRepository: Repository<Especialidad>,
  ) { }

  async create(createEspecialidadDto: CreateEspecialidadDto): Promise<Especialidad> {
    const nuevaEspecialidad = this.especialidadRepository.create(createEspecialidadDto);
    return this.especialidadRepository.save(nuevaEspecialidad);
  }

  async findAll(): Promise<Especialidad[]> {
    return this.especialidadRepository.find();
  }

  async findOne(id: number): Promise<Especialidad> {
    const especialidad = await this.especialidadRepository.findOneBy({ id });
    if (!especialidad) {
      throw new NotFoundException(`La especialidad con el ID ${id} no fue encontrada.`);
    }
    return especialidad;
  }

  async update(id: number, updateEspecialidadDto: UpdateEspecialidadDto): Promise<Especialidad> {
    const especialidad = await this.findOne(id);
    const especialidadActualizada = await this.especialidadRepository.preload({
      id: especialidad.id,
      ...updateEspecialidadDto,
    });

    if (!especialidadActualizada) {
      throw new NotFoundException(`La especialidad con el ID ${id} no fue encontrada.`);
    }

    return this.especialidadRepository.save(especialidadActualizada);
  }

  async remove(id: number): Promise<void> {
    const especialidad = await this.findOne(id);
    await this.especialidadRepository.remove(especialidad);
  }
}
