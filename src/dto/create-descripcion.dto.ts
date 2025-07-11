import { IsNotEmpty, IsString } from "class-validator";

export class CreateDescripcionDto {
    @IsNotEmpty({ message: 'El nombre de la descripcion es obligatorio' })
    @IsString({ message: 'El nombre de la descripcion debe ser una cadena de texto' })
    texto!: string;
}

