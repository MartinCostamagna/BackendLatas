import { PartialType } from '@nestjs/mapped-types';
import { CreateTamañoDto } from './create-tamaño.dto';

export class UpdateTamañoDto extends PartialType(CreateTamañoDto) {}
