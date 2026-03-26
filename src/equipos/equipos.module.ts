import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EquiposService } from './equipos.service';
import { EquiposController } from './equipos.controller';
import { Equipo, EquipoSchema } from './entities/equipo.entity';
import { Partido, PartidoSchema } from '../partidos/entities/partido.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Equipo.name, schema: EquipoSchema },
      { name: Partido.name, schema: PartidoSchema }
    ]),
  ],
  controllers: [EquiposController],
  providers: [EquiposService],
  exports: [EquiposService],
})
export class EquiposModule {}
