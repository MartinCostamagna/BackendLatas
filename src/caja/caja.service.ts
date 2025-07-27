import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Caja } from 'src/entities/caja.entity';
import { CreateCajaDto } from '../dto/create-caja.dto';
import { UpdateCajaDto } from '../dto/update-caja.dto';

@Injectable()
export class CajaService {
  constructor(
    @InjectRepository(Caja)
    private readonly cajaRepository: Repository<Caja>,
  ) { }

  async create(createCajaDto: CreateCajaDto): Promise<Caja> {
    const nuevaCaja = this.cajaRepository.create(createCajaDto);
    return this.cajaRepository.save(nuevaCaja);
  }

  async findAll(): Promise<Caja[]> {
    return this.cajaRepository.find();
  }

  async findOne(numeroDeCaja: number): Promise<Caja> {
    const caja = await this.cajaRepository.findOneBy({ numeroDeCaja });
    if (!caja) {
      throw new NotFoundException(`La caja con el número ${numeroDeCaja} no fue encontrada.`);
    }
    return caja;
  }

  async update(numeroDeCaja: number, updateCajaDto: UpdateCajaDto): Promise<Caja> {
    const caja = await this.findOne(numeroDeCaja);
    const cajaActualizada = await this.cajaRepository.preload({
      numeroDeCaja: caja.numeroDeCaja,
      ...updateCajaDto,
    });

    if (!cajaActualizada) {
      throw new NotFoundException(`la caja con el número ${numeroDeCaja} no fue encontrada.`);
    }

    return this.cajaRepository.save(cajaActualizada);
  }

  async remove(numeroDeCaja: number): Promise<void> {
    const caja = await this.findOne(numeroDeCaja);
    await this.cajaRepository.remove(caja);
  }
}
