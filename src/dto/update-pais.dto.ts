import { PartialType } from '@nestjs/mapped-types';
import { CreatePaisDto } from './create-pais.dto';

export class UpdatePaiDto extends PartialType(CreatePaisDto) { }
