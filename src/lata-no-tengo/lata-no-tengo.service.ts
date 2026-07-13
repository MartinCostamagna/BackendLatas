import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as fs from 'fs/promises';
import * as path from 'path';
import { CreateLataNoTengoDto } from '../dto/create-lata-no-tengo.dto';
import { UpdateLataNoTengoDto } from '../dto/update-lata-no-tengo.dto';
import { LataNoTengo } from '../entities/lata-no-tengo.entity';

@Injectable()
export class LataNoTengoService {
  constructor(
    @InjectRepository(LataNoTengo)
    private readonly lataNoTengoRepository: Repository<LataNoTengo>,
  ) { }

  async guardarArchivosFisicos(files: any[]): Promise<string[]> {
    const carpetaDestino = path.join(process.cwd(), 'uploads', 'lata-no-tengo');

    await fs.mkdir(carpetaDestino, { recursive: true });

    const rutasGuardadas: string[] = [];

    for (const file of files) {
      if (file) {
        const nombreArchivo = `${Date.now()}-${file.originalname.replace(/\s+/g, '_')}`;
        const rutaCompleta = path.join(carpetaDestino, nombreArchivo);

        await fs.writeFile(rutaCompleta, file.buffer);

        rutasGuardadas.push(nombreArchivo);
      }
    }

    return rutasGuardadas;
  }

  async create(createLataNoTengoDto: CreateLataNoTengoDto): Promise<LataNoTengo> {
    const nuevaLata = this.lataNoTengoRepository.create(createLataNoTengoDto);
    return await this.lataNoTengoRepository.save(nuevaLata);
  }

  async findAll(): Promise<LataNoTengo[]> {
    return await this.lataNoTengoRepository.find();
  }

  async findOne(id: number): Promise<LataNoTengo> {
    const lata = await this.lataNoTengoRepository.findOneBy({ id });

    if (!lata) {
      throw new NotFoundException(`La lata con ID #${id} no fue encontrada`);
    }

    return lata;
  }

  async update(id: number, updateLataNoTengoDto: UpdateLataNoTengoDto): Promise<LataNoTengo> {
    const lata = await this.lataNoTengoRepository.preload({
      id: id,
      ...updateLataNoTengoDto,
    });

    if (!lata) {
      throw new NotFoundException(`La lata con ID #${id} no fue encontrada`);
    }

    return await this.lataNoTengoRepository.save(lata);
  }

  async remove(id: number): Promise<void> {
    const lata = await this.findOne(id);

    if (lata.foto1) {
      try {
        const rutaFoto = path.join(process.cwd(), 'uploads', 'lata-no-tengo', lata.foto1);
        await fs.unlink(rutaFoto);
      } catch (error) {
        console.warn(`No se pudo eliminar el archivo físico: ${lata.foto1}`, error);
      }
    }
    await this.lataNoTengoRepository.remove(lata);
  }
}