import { PartialType } from '@nestjs/mapped-types';
import { CreateDescripcionDto } from './create-descripcion.dto';

export class UpdateDescripcionDto extends PartialType(CreateDescripcionDto) {}
