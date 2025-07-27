import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Caja } from 'src/entities/caja.entity';
import { CreateCajaDto } from '../dto/create-caja.dto';
import { UpdateCajaDto } from '../dto/update-caja.dto';
import { Tamaño } from 'src/entities/tamaño.entity';

@Injectable()
export class CajaService {
  constructor(
    @InjectRepository(Caja)
    private readonly cajaRepository: Repository<Caja>,
  ) { }

  async create(createCajaDto: CreateCajaDto): Promise<Caja> {
    const { numeroDeCaja, cantidadActual, tamañoId } = createCajaDto;
    const nuevaCaja = this.cajaRepository.create({ numeroDeCaja, cantidadActual, });
    if (tamañoId) {
      nuevaCaja.tamañoId = { id: tamañoId } as Tamaño;
    }
    return this.cajaRepository.save(nuevaCaja);
  }

  async findAll(): Promise<Caja[]> {
    return this.cajaRepository.find({ relations: { tamañoId: true, }, });
  }

  async findOne(numeroDeCaja: number): Promise<Caja> {
    const caja = await this.cajaRepository.findOneBy({ numeroDeCaja });
    if (!caja) {
      throw new NotFoundException(`La caja con el número ${numeroDeCaja} no fue encontrada.`);
    }
    return caja;
  }

  async update(numeroDeCaja: number, updateCajaDto: UpdateCajaDto): Promise<Caja> {
    const { tamañoId, ...otrosDatos } = updateCajaDto;
    const datosParaPreload = {
      numeroDeCaja: numeroDeCaja,
      ...otrosDatos,
    };
    if (tamañoId) {
      datosParaPreload['tamañoId'] = { id: tamañoId } as Tamaño;
    }
    const cajaActualizada = await this.cajaRepository.preload(datosParaPreload);
    if (!cajaActualizada) {
      throw new NotFoundException(`La caja con el número ${numeroDeCaja} no fue encontrada.`);
    }
    return this.cajaRepository.save(cajaActualizada);
  }

  async remove(numeroDeCaja: number): Promise<void> {
    const caja = await this.findOne(numeroDeCaja);
    await this.cajaRepository.remove(caja);
  }
}
