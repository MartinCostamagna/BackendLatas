import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Lata } from './lata.entity';

@Entity('marcas')
export class Marca {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    nombre!: string;

    @OneToMany(() => Lata, (lata) => lata.marca)
    latas!: Lata[];
}
