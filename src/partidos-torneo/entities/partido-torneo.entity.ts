import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type PartidoTorneoDocument = PartidoTorneo & Document;

@Schema({ collection: 'partidostorneo', timestamps: true })
export class PartidoTorneo {
  @Prop({ required: true, type: Types.ObjectId, ref: 'Torneo' })
  torneo: Types.ObjectId;

  @Prop({ required: true, type: Types.ObjectId, ref: 'Equipo' })
  equipoLocal: Types.ObjectId;

  @Prop({ required: true, type: Types.ObjectId, ref: 'Equipo' })
  equipoVisitante: Types.ObjectId;

  @Prop({ required: true })
  fechaHora: Date;

  @Prop({ required: false, default: null })
  golesLocal: number;

  @Prop({ required: false, default: null })
  golesVisitante: number;

  @Prop({ required: false, default: null })
  penalesLocal: number;

  @Prop({ required: false, default: null })
  penalesVisitante: number;

  @Prop({ required: true, enum: ['programado', 'finalizado'], default: 'programado' })
  estado: string;
}

export const PartidoTorneoSchema = SchemaFactory.createForClass(PartidoTorneo);
