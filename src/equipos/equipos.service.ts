import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateEquipoDto } from './dto/create-equipo.dto';
import { UpdateEquipoDto } from './dto/update-equipo.dto';
import { CreateEstadisticasDto } from './dto/create-estadisticas.dto';
import { Equipo, EquipoDocument } from './entities/equipo.entity';

@Injectable()
export class EquiposService {
  constructor(
    @InjectModel(Equipo.name) private equipoModel: Model<EquipoDocument>,
  ) {}

  async create(createEquipoDto: CreateEquipoDto): Promise<Equipo> {
    const createdEquipo = new this.equipoModel(createEquipoDto);
    return createdEquipo.save();
  }

  async findAll(liga?: string, userId?: string): Promise<Equipo[]> {
    let filter: any = {};
    if (liga) {
      filter.liga = liga;
    } else {
      if (userId) {
        filter = {
          $or: [
            { liga: { $ne: 'barrio' } },
            { userId: userId, liga: 'barrio' }
          ]
        };
      } else {
        filter = { liga: { $ne: 'barrio' } };
      }
    }
    return this.equipoModel.find(filter).sort({ nombre: 1 }).exec();
  }

  async findOne(id: string): Promise<Equipo> {
    const equipo = await this.equipoModel.findById(id).exec();
    if (!equipo) {
      throw new NotFoundException(`Equipo con id ${id} no encontrado`);
    }
    return equipo;
  }

  async update(id: string, updateEquipoDto: UpdateEquipoDto): Promise<Equipo> {
    const updatedEquipo = await this.equipoModel
      .findByIdAndUpdate(id, updateEquipoDto, { new: true })
      .exec();
    if (!updatedEquipo) {
      throw new NotFoundException(`Equipo con id ${id} no encontrado`);
    }
    return updatedEquipo;
  }

  async remove(id: string): Promise<Equipo> {
    const deletedEquipo = await this.equipoModel.findByIdAndDelete(id).exec();
    if (!deletedEquipo) {
      throw new NotFoundException(`Equipo con id ${id} no encontrado`);
    }
    return deletedEquipo;
  }

  async updateEstadisticas(
    id: string,
    createEstadisticasDto: CreateEstadisticasDto,
  ): Promise<Equipo> {
    const updatedEquipo = await this.equipoModel
      .findByIdAndUpdate(
        id,
        { estadisticas: createEstadisticasDto },
        { new: true },
      )
      .exec();

    if (!updatedEquipo) {
      throw new NotFoundException(`Equipo con id ${id} no encontrado`);
    }
    return updatedEquipo;
  }

  async getEstadisticas(id: string): Promise<any> {
    const equipo = await this.equipoModel.findById(id).select('estadisticas').exec();
    if (!equipo) {
      throw new NotFoundException(`Equipo con id ${id} no encontrado`);
    }
    return equipo.estadisticas;
  }
}    
