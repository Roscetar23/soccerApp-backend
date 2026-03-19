import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateEstadisticasDto {
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  ultimosPartidos?: string[];

  @IsNumber()
  @IsOptional()
  porcentajeVictorias?: number;

  @IsNumber()
  @IsOptional()
  promedioPases?: number;

  @IsNumber()
  @IsOptional()
  promedioTirosAlArco?: number;

  @IsNumber()
  @IsOptional()
  promedioFaltas?: number;
}
