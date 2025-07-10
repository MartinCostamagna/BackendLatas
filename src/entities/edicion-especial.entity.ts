import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Lata } from './lata.entity';

@Entity('ediciones_especiales')
export class EdicionEspecial {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    nombre!: string;

    @OneToMany(() => Lata, (lata) => lata.edicionEspecial)
    latas!: Lata[];
}
