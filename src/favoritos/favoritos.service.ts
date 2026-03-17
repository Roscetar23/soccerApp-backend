import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateFavoritoDto } from './dto/create-favorito.dto';
import { UpdateFavoritoDto } from './dto/update-favorito.dto';
import { Favorito, FavoritoDocument } from './entities/favorito.entity';

@Injectable()
export class FavoritosService {
  constructor(
    @InjectModel(Favorito.name) private favoritoModel: Model<FavoritoDocument>,
  ) {}

  async create(createFavoritoDto: CreateFavoritoDto): Promise<Favorito> {
    const createdFavorito = new this.favoritoModel(createFavoritoDto);
    return createdFavorito.save();
  }

  async findAll(): Promise<Favorito[]> {
    return this.favoritoModel.find().exec();
  }

  async findOne(id: string): Promise<Favorito> {
    const favorito = await this.favoritoModel.findById(id).exec();
    if (!favorito) {
      throw new NotFoundException(`Favorito con id ${id} no encontrado`);
    }
    return favorito;
  }

  async update(id: string, updateFavoritoDto: UpdateFavoritoDto): Promise<Favorito> {
    const updatedFavorito = await this.favoritoModel
      .findByIdAndUpdate(id, updateFavoritoDto, { new: true })
      .exec();
    if (!updatedFavorito) {
      throw new NotFoundException(`Favorito con id ${id} no encontrado`);
    }
    return updatedFavorito;
  }

  async remove(id: string): Promise<Favorito> {
    const deletedFavorito = await this.favoritoModel.findByIdAndDelete(id).exec();
    if (!deletedFavorito) {
      throw new NotFoundException(`Favorito con id ${id} no encontrado`);
    }
    return deletedFavorito;
  }
}
