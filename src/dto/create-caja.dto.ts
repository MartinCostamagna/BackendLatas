import { IsNotEmpty, IsInt, IsOptional } from 'class-validator';
export class CreateCajaDto {
    @IsNotEmpty({ message: 'El numero de caja no puede estar vacío.' })
    @IsInt({ message: 'El nombre de la caja debe ser un numero entero.' })
    numeroDeCaja!: number;

    @IsInt({ message: 'El tamaño debe ser un número entero.' })
    @IsOptional()
    tamañoId?: number;

    @IsInt({ message: 'La cantidad actual debe ser un número entero.' })
    @IsOptional()
    cantidadActual?: number;
}
