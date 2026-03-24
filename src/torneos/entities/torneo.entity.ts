import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type TorneoDocument = Torneo & Document;

@Schema({ timestamps: true })
export class Torneo {
  @Prop({ required: true })
  nombre: string;

  @Prop({ required: true, enum: ['eliminacion_directa', 'liguilla'] })
  tipoFormato: string;

  @Prop({ required: true })
  userId: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Equipo' }], default: [] })
  equipos: Types.ObjectId[];
}

export const TorneoSchema = SchemaFactory.createForClass(Torneo);
