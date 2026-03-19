import { Type } from 'class-transformer';
import { IsArray, IsEnum, IsNotEmpty, IsString, ValidateNested } from 'class-validator';

export enum TipoTorneo {
  ELIMINACION_DIRECTA = 'eliminacion_directa',
  LIGA = 'liga',
}

export class TorneoEquipoDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  escudo: string;
}

export class CreateTorneoDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsEnum(TipoTorneo)
  @IsNotEmpty()
  tipo: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TorneoEquipoDto)
  equipos: TorneoEquipoDto[];
}
