import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Marca } from './marca.entity';
import { Tamaño } from './tamaño.entity';
import { Sabor } from './sabor.entity';
import { Especialidad } from './especialidad.entity';
import { EdicionEspecial } from './edicion-especial.entity';
import { Descripcion } from './descripcion.entity';
import { Pais } from './pais.entity';
import { Caja } from './caja.entity';

@Entity('latas')
export class Lata {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Marca, (marca) => marca.latas, { eager: true, nullable: false, onDelete: 'RESTRICT' })
    @JoinColumn({ name: 'marcaId' })
    marca!: Marca;

    @ManyToOne(() => Tamaño, (tamaño) => tamaño.latas, { eager: true, nullable: false, onDelete: 'RESTRICT' })
    @JoinColumn({ name: 'tamañoId' })
    tamaño!: Tamaño;

    @ManyToOne(() => Sabor, (sabor) => sabor.latas, { eager: true, nullable: false, onDelete: 'RESTRICT' })
    @JoinColumn({ name: 'saborId' })
    sabor!: Sabor;

    @ManyToOne(() => Especialidad, (especialidad) => especialidad.latas, { eager: true, nullable: false, onDelete: 'RESTRICT' })
    @JoinColumn({ name: 'especialidadId' })
    especialidad!: Especialidad;

    @Column()
    edicionLimitada!: boolean;

    @ManyToOne(() => EdicionEspecial, (edicionEspecial) => edicionEspecial.latas, { eager: true, nullable: true, onDelete: 'RESTRICT' })
    @JoinColumn({ name: 'edicionEspecialId' })
    edicionEspecial!: EdicionEspecial | null;

    @ManyToOne(() => Descripcion, (descripcion) => descripcion.latas, { eager: true, nullable: true, onDelete: 'RESTRICT' })
    @JoinColumn({ name: 'descripcionId' })
    descripcion!: Descripcion | null;

    @Column()
    anio!: number;

    @ManyToOne(() => Pais, (pais) => pais.latas, { eager: true, nullable: false, onDelete: 'RESTRICT' })
    @JoinColumn({ name: 'paisId' })
    pais!: Pais;

    @ManyToOne(() => Caja, (caja) => caja.latas, { eager: true, nullable: true, onDelete: 'RESTRICT' })
    @JoinColumn({ name: 'cajaId' })
    caja!: Caja | null;

    @Column()
    foto1!: string;

    @Column()
    foto2!: string | null;

    @Column()
    foto3!: string | null;
}


