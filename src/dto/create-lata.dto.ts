import { IsBoolean, IsInt, IsNotEmpty, IsOptional, MaxLength, IsUrl, Min, Max } from "class-validator";

export class CreateLataDto {
    @IsNotEmpty({ message: 'La marca es obligatoria' })
    @IsInt({ message: 'El ID de la marca debe ser un número entero' })
    marcaId!: number;

    @IsNotEmpty({ message: 'El tamaño es obligatorio' })
    @IsInt({ message: 'El ID del tamaño debe ser un número entero' })
    tamañoId!: number;

    @IsNotEmpty({ message: 'El sabor es obligatorio' })
    @IsInt({ message: 'El ID del sabor debe ser un número entero' })
    saborId!: number;

    @IsNotEmpty({ message: 'La especialidad es obligatoria' })
    @IsInt({ message: 'El ID de la especialidad debe ser un número entero' })
    especialidadId!: number;

    @IsNotEmpty({ message: 'El tipo de edición es obligatorio' })
    @IsBoolean({ message: 'El campo edicionLimitada debe ser un booleano' })
    edicionLimitada!: boolean;

    @IsOptional()
    @IsInt({ message: 'El ID de la edición especial debe ser un número entero' })
    edicionEspecialId?: number;

    @IsOptional()
    @IsInt({ message: 'El ID de la descripción debe ser un número entero' })
    descripcionId?: number;

    @IsNotEmpty({ message: 'El año es obligatorio' })
    @IsInt({ message: 'El año debe ser un número entero' })
    @Min(1900, { message: 'El año no puede ser menor a 1900' })
    @Max(2100, { message: 'El año no puede ser mayor a 2100' })
    anio!: number;

    @IsNotEmpty({ message: 'El país es obligatorio' })
    @IsInt({ message: 'El ID del país debe ser un número entero' })
    paisId!: number;

    @IsOptional()
    @IsInt({ message: 'El ID de la caja debe ser un número entero' })
    cajaId?: number;

    @IsNotEmpty({ message: 'La foto 1 es obligatoria' })
    @IsUrl({}, { message: 'La foto 1 debe ser una URL válida' })
    @MaxLength(255, { message: 'La URL de la foto 1 no puede exceder los 255 caracteres' })
    foto1!: string;

    @IsOptional()
    @IsUrl({}, { message: 'La foto 2 debe ser una URL válida' })
    @MaxLength(255, { message: 'La URL de la foto 2 no puede exceder los 255 caracteres' })
    foto2?: string;

    @IsOptional()
    @IsUrl({}, { message: 'La foto 3 debe ser una URL válida' })
    @MaxLength(255, { message: 'La URL de la foto 3 no puede exceder los 255 caracteres' })
    foto3?: string;
}
