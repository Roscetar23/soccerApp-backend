import { IsMongoId, IsNotEmpty, IsDateString, IsEnum, IsOptional, IsInt, Min } from 'class-validator';

export class CreatePartidoTorneoDto {
  @IsNotEmpty()
  @IsMongoId()
  torneo: string;

  @IsNotEmpty()
  @IsMongoId()
  equipoLocal: string;

  @IsNotEmpty()
  @IsMongoId()
  equipoVisitante: string;

  @IsNotEmpty()
  @IsDateString()
  fechaHora: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  golesLocal?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  golesVisitante?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  penalesLocal?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  penalesVisitante?: number;

  @IsOptional()
  @IsEnum(['programado', 'finalizado'])
  estado?: string;
}
