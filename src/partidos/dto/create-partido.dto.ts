import { IsString, IsNotEmpty, IsDateString, IsOptional } from 'class-validator';

export class CreatePartidoDto {
  @IsNotEmpty()
  @IsString()
  equipoLocal: string;

  @IsNotEmpty()
  @IsString()
  equipoVisitante: string;

  @IsNotEmpty()
  @IsString()
  competicion: string;

  @IsNotEmpty()
  @IsDateString()
  fechaPartido: string;

  @IsOptional()
  @IsString()
  estadio?: string;

  @IsOptional()
  @IsString()
  estado?: string;
}
