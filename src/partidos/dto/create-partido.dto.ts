import { IsDateString, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePartidoDto {
  @IsString()
  @IsNotEmpty()
  equipoLocal: string;

  @IsString()
  @IsNotEmpty()
  equipoVisitante: string;

  @IsString()
  @IsNotEmpty()
  competicion: string;

  @IsDateString()
  @IsNotEmpty()
  fechaPartido: Date;

  @IsString()
  @IsOptional()
  estadio?: string;
}
