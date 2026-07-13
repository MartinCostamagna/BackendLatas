import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('LataNoTengo')
export class LataNoTengo {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    nombre!: string;

    @Column()
    estado!: string;

    @Column()
    foto1!: string;
}
