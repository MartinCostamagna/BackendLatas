import { IsNotEmpty, IsString } from "class-validator";

export class CreatePaisDto {
    @IsNotEmpty({ message: 'El nombre del país es obligatorio' })
    @IsString({ message: 'El nombre del país debe ser una cadena de texto' })
    nombre!: string;
}
