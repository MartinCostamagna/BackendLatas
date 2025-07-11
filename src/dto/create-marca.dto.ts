import { IsNotEmpty, IsString } from "class-validator";

export class CreateMarcaDto {
    @IsNotEmpty({ message: 'El nombre de la marca es obligatorio' })
    @IsString({ message: 'El nombre de la marca debe ser una cadena de texto' })
    nombre: string;
}
