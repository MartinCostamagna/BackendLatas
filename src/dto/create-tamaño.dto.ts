import { IsInt, IsNotEmpty, IsPositive } from "class-validator";

export class CreateTamañoDto {
    @IsNotEmpty({ message: 'El volumen es obligatorio' })
    @IsInt({ message: 'El volumen debe ser un número entero' })
    @IsPositive({ message: 'El volumen no puede ser negativo' })
    volumen!: number;
}
