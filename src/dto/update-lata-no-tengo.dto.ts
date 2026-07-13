import { PartialType } from '@nestjs/mapped-types';
import { CreateLataNoTengoDto } from './create-lata-no-tengo.dto';

export class UpdateLataNoTengoDto extends PartialType(CreateLataNoTengoDto) {}
