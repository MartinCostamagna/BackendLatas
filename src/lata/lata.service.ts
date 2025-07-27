import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lata } from 'src/entities/lata.entity';
import { CreateLataDto } from '../dto/create-lata.dto';
import { UpdateLataDto } from '../dto/update-lata.dto';

@Injectable()
export class LataService {
  constructor(
    @InjectRepository(Lata)
    private readonly lataRepository: Repository<Lata>,
  ) { }

  async create(createLataDto: CreateLataDto): Promise<Lata> {
    const nuevaLata = this.lataRepository.create(createLataDto);
    return this.lataRepository.save(nuevaLata);
  }

  async findAll(): Promise<Lata[]> {
    return this.lataRepository.find();
  }

  async findOne(id: number): Promise<Lata> {
    const lata = await this.lataRepository.findOneBy({ id });
    if (!lata) {
      throw new NotFoundException(`La lata con el ID ${id} no fue encontrada.`);
    }
    return lata;
  }

  async update(id: number, updateLataDto: UpdateLataDto): Promise<Lata> {
    const lata = await this.findOne(id);
    const lataActualizada = await this.lataRepository.preload({
      id: lata.id,
      ...updateLataDto,
    });

    if (!lataActualizada) {
      throw new NotFoundException(`La lata con el ID ${id} no fue encontrada.`);
    }

    return this.lataRepository.save(lataActualizada);
  }

  async remove(id: number): Promise<void> {
    const lata = await this.findOne(id);
    await this.lataRepository.remove(lata);
  }
}
