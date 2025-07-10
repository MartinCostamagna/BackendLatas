import { PartialType } from '@nestjs/mapped-types';
import { CreateLataDto } from './create-lata.dto';

export class UpdateLataDto extends PartialType(CreateLataDto) {}
