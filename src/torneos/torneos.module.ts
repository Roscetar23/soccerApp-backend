import { Module } from '@nestjs/common';
import { TorneosService } from './torneos.service';
import { TorneosController } from './torneos.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Torneo, TorneoSchema } from './entities/torneo.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: Torneo.name, schema: TorneoSchema }])],
  controllers: [TorneosController],
  providers: [TorneosService],
})
export class TorneosModule {}
