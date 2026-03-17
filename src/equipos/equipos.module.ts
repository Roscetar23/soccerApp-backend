import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EquiposService } from './equipos.service';
import { EquiposController } from './equipos.controller';
import { Equipo, EquipoSchema } from './entities/equipo.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Equipo.name, schema: EquipoSchema }]),
  ],
  controllers: [EquiposController],
  providers: [EquiposService],
  exports: [EquiposService],
})
export class EquiposModule {}
