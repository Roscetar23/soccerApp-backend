import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ _id: false })
export class TorneoEquipo {
  @Prop({ required: true })
  nombre: string;

  @Prop({ required: true })
  escudo: string;
}

export type TorneoDocument = Torneo & Document;

@Schema({ timestamps: true })
export class Torneo {
  @Prop({ required: true })
  nombre: string;

  @Prop({ required: true, enum: ['eliminacion_directa', 'liga'] })
  tipo: string;

  @Prop({ type: [TorneoEquipo], default: [] })
  equipos: TorneoEquipo[];
}

export const TorneoSchema = SchemaFactory.createForClass(Torneo);
