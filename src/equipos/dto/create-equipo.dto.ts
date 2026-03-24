import { IsDateString, IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateEquipoDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  escudo: string;

  @IsDateString()
  @IsNotEmpty()
  fechaCreacion: Date;

  @IsString()
  @IsNotEmpty()
  liga: string;

  @IsOptional()
  @IsString()
  userId?: string;
}
