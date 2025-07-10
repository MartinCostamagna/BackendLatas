import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Lata } from './lata.entity';

@Entity('especialidades')
export class Especialidad {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    nombre!: string;

    @OneToMany(() => Lata, (lata) => lata.especialidad)
    latas!: Lata;
}
