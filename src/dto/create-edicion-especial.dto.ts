import { IsNotEmpty, IsString } from "class-validator";

export class CreateEdicionEspecialDto {
    @IsNotEmpty({ message: 'El campo nombre es obligatorio' })
    @IsString({ message: 'El campo nombre debe ser una cadena de texto' })
    nombre!: string;
}
