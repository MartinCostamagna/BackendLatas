import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Tamaño } from './tamaño.entity';
import { Lata } from './lata.entity';

@Entity('cajas')
export class Caja {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Tamaño, (tamaño) => tamaño.cajas, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'tamañoId' })
    tamañoDeLata!: Tamaño | null;

    @Column()
    cantidadActual!: number;

    @OneToMany(() => Lata, (lata) => lata.caja)
    latas!: Lata[];
}
