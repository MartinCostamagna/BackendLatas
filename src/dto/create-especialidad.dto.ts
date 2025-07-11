import { IsNotEmpty, IsString } from "class-validator";

export class CreateEspecialidadDto {
    @IsNotEmpty({ message: 'El nombre de la especialidad es obligatorio' })
    @IsString({ message: 'El nombre de la especialidad debe ser una cadena de texto' })
    nombre!: string;
}   
