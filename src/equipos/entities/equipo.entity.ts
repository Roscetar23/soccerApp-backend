import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EquipoDocument = Equipo & Document;

@Schema({ timestamps: true })
export class Equipo {
  @Prop({ required: true })
  nombre: string;

  @Prop({ required: true })
  escudo: string;

  @Prop({ required: true })
  fechaCreacion: Date;

  @Prop({ required: true })
  liga: string;
}

export const EquipoSchema = SchemaFactory.createForClass(Equipo);
