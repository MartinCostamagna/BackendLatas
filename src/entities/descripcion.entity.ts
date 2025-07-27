import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Lata } from './lata.entity';

@Entity('descripciones')
export class Descripcion {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    texto!: string;

    @OneToMany(() => Lata, (lata) => lata.descripcion)
    latas!: Lata[];
}
