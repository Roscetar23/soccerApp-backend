import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PartidosService } from './partidos.service';
import { PartidosController } from './partidos.controller';
import { Partido, PartidoSchema } from './entities/partido.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Partido.name, schema: PartidoSchema }])
  ],
  controllers: [PartidosController],
  providers: [PartidosService],
})
export class PartidosModule {}
