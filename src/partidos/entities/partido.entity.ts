import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PartidoDocument = Partido & Document;

@Schema({ timestamps: true })
export class Partido {
  @Prop({ required: true })
  equipoLocal: string;

  @Prop({ required: true })
  equipoVisitante: string;

  @Prop({ required: true })
  competicion: string;

  @Prop({ required: true })
  fechaPartido: Date;

  @Prop()
  estadio: string;

  @Prop({ default: 'Programado' }) // Programado, En Juego, Finalizado
  estado: string;
}

export const PartidoSchema = SchemaFactory.createForClass(Partido);
