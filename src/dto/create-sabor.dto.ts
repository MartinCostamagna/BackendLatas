import { IsNotEmpty, IsString } from "class-validator";

export class CreateSaborDto {
    @IsNotEmpty({ message: 'El nombre del sabor es obligatorio' })
    @IsString({ message: 'El nombre del sabor debe ser una cadena de texto' })
    nombre!: string;
}
