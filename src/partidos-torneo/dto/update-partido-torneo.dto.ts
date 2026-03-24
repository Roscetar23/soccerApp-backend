import { PartialType } from '@nestjs/mapped-types';
import { CreatePartidoTorneoDto } from './create-partido-torneo.dto';

export class UpdatePartidoTorneoDto extends PartialType(CreatePartidoTorneoDto) {}
