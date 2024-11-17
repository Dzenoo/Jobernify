import { PartialType } from '@nestjs/mapped-types';
import { CreateSeekerDto } from './create-seeker.dto';

export class UpdateSeekerDto extends PartialType(CreateSeekerDto) {}
