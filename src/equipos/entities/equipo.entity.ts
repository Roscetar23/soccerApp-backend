import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ _id: false })
export class EstadisticasEquipo {
  @Prop({ type: [String], default: [] })
  ultimosPartidos: string[];

  @Prop({ default: 0 })
  porcentajeVictorias: number;

  @Prop({ default: 0 })
  promedioPases: number;

  @Prop({ default: 0 })
  promedioTirosAlArco: number;

  @Prop({ default: 0 })
  promedioFaltas: number;

  @Prop({ default: 0 })
  puntos: number;

  @Prop({ default: 0 })
  partidosJugados: number;

  @Prop({ default: 0 })
  victorias: number;

  @Prop({ default: 0 })
  empates: number;

  @Prop({ default: 0 })
  derrotas: number;

  @Prop({ default: 0 })
  golesFavor: number;

  @Prop({ default: 0 })
  golesContra: number;
}

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

  @Prop()
  estadio: string;

  @Prop({ required: false })
  userId?: string;

  @Prop({ type: EstadisticasEquipo, default: () => ({}) })
  estadisticas: EstadisticasEquipo;
}

export const EquipoSchema = SchemaFactory.createForClass(Equipo);
