import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FavoritoDocument = Favorito & Document;

@Schema({ timestamps: true })
export class Favorito {
  @Prop({ required: true })
  liga: string;

  @Prop({ required: true })
  equipo: string;

  @Prop({ required: true })
  userId: string;
}

export const FavoritoSchema = SchemaFactory.createForClass(Favorito);
