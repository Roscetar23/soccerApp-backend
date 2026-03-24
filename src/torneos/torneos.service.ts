import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTorneoDto } from './dto/create-torneo.dto';
import { UpdateTorneoDto } from './dto/update-torneo.dto';
import { Torneo, TorneoDocument } from './entities/torneo.entity';

@Injectable()
export class TorneosService {
  constructor(@InjectModel(Torneo.name) private torneoModel: Model<TorneoDocument>) {}

  async create(createTorneoDto: CreateTorneoDto): Promise<Torneo> {
    const createdTorneo = new this.torneoModel(createTorneoDto);
    return createdTorneo.save();
  }

  async findAll(): Promise<Torneo[]> {
    return this.torneoModel.find().populate('equipos').exec();
  }

  async findByUsuario(userId: string): Promise<Torneo[]> {
    return this.torneoModel.find({ userId }).populate('equipos').exec();
  }

  async findOne(id: string): Promise<Torneo> {
    const torneo = await this.torneoModel.findById(id).populate('equipos').exec();
    if (!torneo) throw new NotFoundException('Torneo no encontrado');
    return torneo;
  }

  async update(id: string, updateTorneoDto: UpdateTorneoDto): Promise<Torneo> {
    const updatedTorneo = await this.torneoModel
      .findByIdAndUpdate(id, updateTorneoDto, { new: true })
      .exec();
    if (!updatedTorneo) throw new NotFoundException('Torneo no encontrado');
    return updatedTorneo;
  }

  async remove(id: string): Promise<void> {
    const result = await this.torneoModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException('Torneo no encontrado');
  }
}
