import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Lata } from './lata.entity';

@Entity('paises')
export class Pais {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    nombre!: string;

    @OneToMany(() => Lata, (lata) => lata.pais)
    latas!: Lata[];
}
