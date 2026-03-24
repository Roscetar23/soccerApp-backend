import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PartidosTorneoService } from './partidos-torneo.service';
import { PartidosTorneoController } from './partidos-torneo.controller';
import { PartidoTorneo, PartidoTorneoSchema } from './entities/partido-torneo.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: PartidoTorneo.name, schema: PartidoTorneoSchema }])],
  controllers: [PartidosTorneoController],
  providers: [PartidosTorneoService],
})
export class PartidosTorneoModule {}
