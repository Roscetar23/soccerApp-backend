import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FavoritosService } from './favoritos.service';
import { FavoritosController } from './favoritos.controller';
import { Favorito, FavoritoSchema } from './entities/favorito.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Favorito.name, schema: FavoritoSchema }]),
  ],
  controllers: [FavoritosController],
  providers: [FavoritosService],
  exports: [FavoritosService],
})
export class FavoritosModule {}
