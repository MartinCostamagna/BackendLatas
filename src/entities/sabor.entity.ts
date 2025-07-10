import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Lata } from './lata.entity';

@Entity('sabores')
export class Sabor {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    nombre!: string;

    @OneToMany(() => Lata, (lata) => lata.sabor)
    latas!: Lata[];
}
