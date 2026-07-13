import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateLataNoTengoDto {
    @IsNotEmpty({ message: 'El nombre de la lata es obligatorio' })
    @IsString({ message: 'El nombre de la lata debe ser una cadena de texto' })
    nombre!: string;

    @IsNotEmpty({ message: 'El estado de la lata es obligatorio' })
    @IsString({ message: 'El estado de la lata debe ser una cadena de texto' })
    estado!: string;

    @IsNotEmpty({ message: 'La foto 1 es obligatoria' })
    @MaxLength(255, { message: 'La URL de la foto 1 no puede exceder los 255 caracteres' })
    foto1!: string;
}
