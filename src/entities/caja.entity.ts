import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Tamaño } from './tamaño.entity';
import { Lata } from './lata.entity';

@Entity('cajas')
export class Caja {
    @PrimaryColumn()
    numeroDeCaja!: number;

    @ManyToOne(() => Tamaño, (tamaño) => tamaño.cajas, { nullable: true, onDelete: 'SET NULL' })
    @JoinColumn({ name: 'tamañoId' })
    tamañoId!: Tamaño;

    @Column({ default: 0 })
    cantidadActual!: number;

    @OneToMany(() => Lata, (lata) => lata.caja)
    latas!: Lata[];
}
