import { PartialType } from '@nestjs/mapped-types';
import { CreateEdicionEspecialDto } from './create-edicion-especial.dto';

export class UpdateEdicionEspecialDto extends PartialType(CreateEdicionEspecialDto) {}
