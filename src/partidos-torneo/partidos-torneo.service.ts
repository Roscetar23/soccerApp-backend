import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePartidoTorneoDto } from './dto/create-partido-torneo.dto';
import { UpdatePartidoTorneoDto } from './dto/update-partido-torneo.dto';
import { PartidoTorneo, PartidoTorneoDocument } from './entities/partido-torneo.entity';

@Injectable()
export class PartidosTorneoService {
  constructor(@InjectModel(PartidoTorneo.name) private partidoTorneoModel: Model<PartidoTorneoDocument>) {}

  async create(createPartidoTorneoDto: CreatePartidoTorneoDto): Promise<PartidoTorneo> {
    const created = new this.partidoTorneoModel(createPartidoTorneoDto);
    return created.save();
  }

  async findAll(): Promise<PartidoTorneo[]> {
    return this.partidoTorneoModel.find().populate(['torneo', 'equipoLocal', 'equipoVisitante']).exec();
  }

  async findOne(id: string): Promise<PartidoTorneo> {
    const partido = await this.partidoTorneoModel.findById(id).populate(['torneo', 'equipoLocal', 'equipoVisitante']).exec();
    if (!partido) throw new NotFoundException('Partido no encontrado');
    return partido;
  }

  async findByTorneo(torneoId: string): Promise<PartidoTorneo[]> {
    return this.partidoTorneoModel.find({ torneo: torneoId }).populate(['equipoLocal', 'equipoVisitante']).exec();
  }

  async update(id: string, updatePartidoTorneoDto: UpdatePartidoTorneoDto): Promise<PartidoTorneo> {
    const updated = await this.partidoTorneoModel
      .findByIdAndUpdate(id, updatePartidoTorneoDto, { new: true })
      .exec();
    if (!updated) throw new NotFoundException('Partido no encontrado');
    return updated;
  }

  async remove(id: string): Promise<void> {
    const result = await this.partidoTorneoModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException('Partido no encontrado');
  }
}
