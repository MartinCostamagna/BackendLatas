import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Caja } from './caja.entity';
import { Lata } from './lata.entity';

@Entity('tamaños')
export class Tamaño {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    volumen!: number;

    @OneToMany(() => Caja, (caja) => caja.tamañoDeLata)
    cajas!: Caja[];

    @OneToMany(() => Lata, (lata) => lata.tamaño)
    latas!: Lata[];
}
