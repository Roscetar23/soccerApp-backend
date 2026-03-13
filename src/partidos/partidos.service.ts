import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePartidoDto } from './dto/create-partido.dto';
import { UpdatePartidoDto } from './dto/update-partido.dto';
import { Partido, PartidoDocument } from './entities/partido.entity';

@Injectable()
export class PartidosService {
  constructor(
    @InjectModel(Partido.name) private partidoModel: Model<PartidoDocument>,
  ) {}

  async create(createPartidoDto: CreatePartidoDto): Promise<Partido> {
    const createdPartido = new this.partidoModel(createPartidoDto);
    return createdPartido.save();
  }

  async findAll(): Promise<Partido[]> {
    // Return all sorted by upcoming dates
    return this.partidoModel.find().sort({ fechaPartido: 1 }).exec();
  }

  async findUpcoming(): Promise<Partido[]> {
    const now = new Date();
    return this.partidoModel
      .find({ fechaPartido: { $gte: now } })
      .sort({ fechaPartido: 1 })
      .exec();
  }

  async findOne(id: string): Promise<Partido> {
    const partido = await this.partidoModel.findById(id).exec();
    if (!partido) {
      throw new NotFoundException(`Partido con id ${id} no encontrado`);
    }
    return partido;
  }

  async update(id: string, updatePartidoDto: UpdatePartidoDto): Promise<Partido> {
    const updatedPartido = await this.partidoModel
      .findByIdAndUpdate(id, updatePartidoDto, { new: true })
      .exec();
    if (!updatedPartido) {
      throw new NotFoundException(`Partido con id ${id} no encontrado`);
    }
    return updatedPartido;
  }

  async remove(id: string): Promise<Partido> {
    const deletedPartido = await this.partidoModel.findByIdAndDelete(id).exec();
    if (!deletedPartido) {
      throw new NotFoundException(`Partido con id ${id} no encontrado`);
    }
    return deletedPartido;
  }
}
