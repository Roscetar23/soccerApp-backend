import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

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
}
