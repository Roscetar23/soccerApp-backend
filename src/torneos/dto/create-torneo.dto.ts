import { IsString, IsEnum, IsNotEmpty, IsArray, IsMongoId } from 'class-validator';

export class CreateTorneoDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsEnum(['eliminacion_directa', 'liguilla'])
  tipoFormato: string;

  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsArray()
  @IsMongoId({ each: true })
  equipos: string[];
}
