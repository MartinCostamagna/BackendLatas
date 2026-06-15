import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lata } from 'src/entities/lata.entity';
import { CreateLataDto } from '../dto/create-lata.dto';
import { UpdateLataDto } from '../dto/update-lata.dto';
import * as fs from 'fs';
import * as path from 'path';
import { Caja } from 'src/entities/caja.entity';

@Injectable()
export class LataService {
  constructor(
    @InjectRepository(Lata)
    private readonly lataRepository: Repository<Lata>,

    @InjectRepository(Caja)
    private readonly cajaRepository: Repository<Caja>,
  ) { }


  async create(createLataDto: CreateLataDto): Promise<Lata> {
    const {
      marcaId,
      tamañoId,
      saborId,
      especialidadId,
      edicionEspecialId,
      descripcionId,
      paisId,
      numeroDeCaja,
      ...otrosDatos
    } = createLataDto;
    const nuevaLata = this.lataRepository.create({
      ...otrosDatos,
    });
    if (marcaId) nuevaLata.marca = { id: marcaId } as any;
    if (tamañoId) nuevaLata.tamaño = { id: tamañoId } as any;
    if (saborId) nuevaLata.sabor = { id: saborId } as any;
    if (especialidadId) nuevaLata.especialidad = { id: especialidadId } as any;
    if (edicionEspecialId) nuevaLata.edicionEspecial = { id: edicionEspecialId } as any;
    if (descripcionId) nuevaLata.descripcion = { id: descripcionId } as any;
    if (paisId) nuevaLata.pais = { id: paisId } as any;
    if (numeroDeCaja) nuevaLata.caja = { numeroDeCaja: numeroDeCaja } as any;
    return this.lataRepository.save(nuevaLata);
  }

  async guardarArchivosFisicos(nombreMarca: string, files: any[]): Promise<string[]> {
    const rutasImagenes: string[] = [];

    const carpetaLimpia = nombreMarca.trim();
    const carpetaDestino = path.resolve('.', 'uploads', 'imagenes', carpetaLimpia);

    if (!fs.existsSync(carpetaDestino)) {
      fs.mkdirSync(carpetaDestino, { recursive: true });
    }

    files.forEach((file, index) => {
      const timestamp = Date.now();
      const extension = path.extname(file.originalname);


      const nombreArchivoParaFoto = carpetaLimpia.replace(/\s+/g, '_');
      const nombreArchivo = `${nombreArchivoParaFoto}_${timestamp}_${index + 1}${extension}`;

      const rutaCompleta = path.join(carpetaDestino, nombreArchivo);

      fs.writeFileSync(rutaCompleta, file.buffer);

      rutasImagenes.push(`${carpetaLimpia}/${nombreArchivo}`);
    });

    return rutasImagenes;
  }

  async insertarLataEnBd(dto: CreateLataDto) {
    try {
      const entidadFormateada = {
        anio: dto.anio,
        edicionLimitada: dto.edicionLimitada,
        foto1: dto.foto1,
        foto2: dto.foto2 || null,
        foto3: dto.foto3 || null,
        marca: { id: dto.marcaId },
        tamaño: { id: dto.tamañoId },
        sabor: { id: dto.saborId },
        especialidad: { id: dto.especialidadId },
        pais: { id: dto.paisId },
        edicionEspecial: dto.edicionEspecialId ? { id: dto.edicionEspecialId } : null,
        descripcion: dto.descripcionId ? { id: dto.descripcionId } : null,
        caja: dto.numeroDeCaja ? { numeroDeCaja: dto.numeroDeCaja } : null,
      };

      console.log('Objeto formateado con relaciones para TypeORM:', entidadFormateada);

      await this.lataRepository.insert(entidadFormateada as any);

      if (dto.numeroDeCaja) {
        console.log(`Incrementando cantidadActual de la caja número: ${dto.numeroDeCaja}`);

        await this.cajaRepository.increment(
          { numeroDeCaja: dto.numeroDeCaja }, 'cantidadActual', 1
        );
      }

      return { message: 'Lata creada con éxito e incremento de caja registrado', data: dto };

    } catch (error: any) {
      throw new BadRequestException(`Error al insertar en la BD: ${error.message}`);
    }
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

  async obtenerUltimasLatas(cantidad: number = 4): Promise<Lata[]> {
    return this.lataRepository.find({
      relations: ['marca', 'pais'],
      order: {
        id: 'DESC'
      },
      take: cantidad
    });
  }

  async obtenerEstadisticas() {
    const cantidadLatas = await this.lataRepository.count();
    const resultadoPaises = await this.lataRepository.createQueryBuilder('lata')
      .select('COUNT(DISTINCT lata.paisId)', 'cantidad')
      .getRawOne();

    return {
      cantidadLatas,
      cantidadPaises: Number(resultadoPaises.cantidad) || 0
    };
  }

  async obtenerLataRandom(): Promise<Lata> {
    const lataAleatoria = await this.lataRepository.createQueryBuilder('lata')
      .orderBy('RANDOM()')
      .limit(1)
      .getOne();
    if (!lataAleatoria) {
      throw new NotFoundException('No hay latas en la base de datos.');
    }
    const lataCompleta = await this.lataRepository.findOne({
      where: { id: lataAleatoria.id },
      relations: ['marca', 'tamaño', 'sabor', 'especialidad', 'pais', 'edicionEspecial', 'descripcion', 'caja']
    });
    if (!lataCompleta) {
      throw new NotFoundException('No hay se encontro la lata.');
    }
    return lataCompleta;
  }

  async update(id: number, updateLataDto: any): Promise<Lata> {
    const lata = await this.findOne(id);

    const datosActualizados: any = {
      id: lata.id,
      anio: updateLataDto.anio,
      edicionLimitada: updateLataDto.edicionLimitada
    };

    if (updateLataDto.marcaId) datosActualizados.marca = { id: updateLataDto.marcaId };
    if (updateLataDto.tamañoId) datosActualizados.tamaño = { id: updateLataDto.tamañoId };
    if (updateLataDto.saborId) datosActualizados.sabor = { id: updateLataDto.saborId };
    if (updateLataDto.especialidadId) datosActualizados.especialidad = { id: updateLataDto.especialidadId };
    if (updateLataDto.paisId) datosActualizados.pais = { id: updateLataDto.paisId };

    if ('edicionEspecialId' in updateLataDto) {
      datosActualizados.edicionEspecial = updateLataDto.edicionEspecialId ? { id: updateLataDto.edicionEspecialId } : null;
    }
    if ('descripcionId' in updateLataDto) {
      datosActualizados.descripcion = updateLataDto.descripcionId ? { id: updateLataDto.descripcionId } : null;
    }

    if ('numeroDeCaja' in updateLataDto) {
      const cajaAnterior = lata.caja?.numeroDeCaja;
      const cajaNueva = updateLataDto.numeroDeCaja;

      if (cajaAnterior !== cajaNueva) {
        if (cajaAnterior) {
          await this.cajaRepository.decrement({ numeroDeCaja: cajaAnterior }, 'cantidadActual', 1);
        }
        if (cajaNueva) {
          await this.cajaRepository.increment({ numeroDeCaja: cajaNueva }, 'cantidadActual', 1);
        }
      }
      datosActualizados.caja = cajaNueva ? { numeroDeCaja: cajaNueva } : null;
    }

    const lataActualizada = await this.lataRepository.preload(datosActualizados);

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
