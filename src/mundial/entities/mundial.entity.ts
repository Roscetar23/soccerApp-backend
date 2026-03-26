import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MundialDocument = Mundial & Document;

@Schema({ timestamps: true })
export class Sede {
  @Prop() nombre: string;
  @Prop() ciudad: string;
  @Prop() pais: string;
  @Prop() capacidad: string;
  @Prop() imagen: string;
}

@Schema({ timestamps: true })
export class Clasificado {
  @Prop() id: string;
  @Prop() nombre: string;
  @Prop() region: string;
  @Prop() bandera: string;
}

@Schema({ timestamps: true })
export class GrupoMundial {
  @Prop() nombre: string;
  @Prop({ type: [String] }) equipos: string[];
}

@Schema({ timestamps: true, collection: 'mundial_config' })
export class Mundial {
  @Prop({ required: true, default: 'Mundial 2026' })
  edicion: string;

  @Prop({ type: [Object], default: [] })
  sedes: Sede[];

  @Prop({ type: [Object], default: [] })
  clasificados: Clasificado[];

  @Prop({ type: [Object], default: [] })
  grupos: GrupoMundial[];
}

export const MundialSchema = SchemaFactory.createForClass(Mundial);
