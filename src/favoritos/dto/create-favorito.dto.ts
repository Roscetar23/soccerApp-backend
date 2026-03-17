import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFavoritoDto {
  @IsString()
  @IsNotEmpty()
  liga: string;

  @IsString()
  @IsNotEmpty()
  equipo: string;
}
