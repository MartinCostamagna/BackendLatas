import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as fs from 'fs/promises';
import * as path from 'path';
import { CreateLataNoTengoDto } from '../dto/create-lata-no-tengo.dto';
import { UpdateLataNoTengoDto } from '../dto/update-lata-no-tengo.dto';
import { LataNoTengo } from '../entities/lata-no-tengo.entity';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class LataNoTengoService {
  private supabase: SupabaseClient;
  constructor(
    @InjectRepository(LataNoTengo)
    private readonly lataNoTengoRepository: Repository<LataNoTengo>,
  ) {
    this.supabase = createClient(
      process.env.SUPABASE_URL as string,
      process.env.SUPABASE_KEY as string
    );
  }

  private limpiarTexto(texto: string): string {
    return texto
      .replace(/[áÁ]/g, 'a')
      .replace(/[éÉ]/g, 'e')
      .replace(/[íÍ]/g, 'i')
      .replace(/[óÓ]/g, 'o')
      .replace(/[úÚ]/g, 'u')
      .replace(/[ñÑ]/g, 'n')
      .replace(/['%,]/g, '')
      .trim()
      .replace(/\s+/g, '_');
  }

  async guardarArchivosFisicos(files: any[]): Promise<string[]> {
    const rutasGuardadas: string[] = [];

    for (const file of files) {
      if (file) {
        const timestamp = Date.now();
        const originalLimpio = this.limpiarTexto(path.parse(file.originalname).name);
        const extension = path.extname(file.originalname);

        let nombreArchivo = `${timestamp}_${originalLimpio}${extension}`;
        nombreArchivo = nombreArchivo.replace(/[^a-zA-Z0-9.\-_]/g, '');

        const rutaEnBucket = `lata-no-tengo/${nombreArchivo}`;

        const { error } = await this.supabase
          .storage
          .from('Imagenes')
          .upload(rutaEnBucket, file.buffer, {
            contentType: file.mimetype,
            upsert: true
          });

        if (error) {
          throw new BadRequestException(`Error subiendo imagen a la nube: ${error.message}`);
        }

        const { data: publicUrlData } = this.supabase
          .storage
          .from('Imagenes')
          .getPublicUrl(rutaEnBucket);

        rutasGuardadas.push(publicUrlData.publicUrl);
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
        const urlParts = lata.foto1.split('/');
        const fileName = urlParts[urlParts.length - 1];

        await this.supabase
          .storage
          .from('Imagenes')
          .remove([`lata-no-tengo/${fileName}`]);

      } catch (error) {
        console.warn(`No se pudo eliminar el archivo en Supabase: ${lata.foto1}`, error);
      }
    }

    await this.lataNoTengoRepository.remove(lata);
  }
}