import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateEquipoDto } from './dto/create-equipo.dto';
import { UpdateEquipoDto } from './dto/update-equipo.dto';
import { CreateEstadisticasDto } from './dto/create-estadisticas.dto';
import { Equipo, EquipoDocument } from './entities/equipo.entity';
import { Partido, PartidoDocument } from '../partidos/entities/partido.entity';
import * as xlsx from 'xlsx';

@Injectable()
export class EquiposService {
  constructor(
    @InjectModel(Equipo.name) private equipoModel: Model<EquipoDocument>,
    @InjectModel(Partido.name) private partidoModel: Model<PartidoDocument>,
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

  async getTablaPosiciones(liga: string): Promise<Equipo[]> {
    return this.equipoModel
      .find({ liga })
      .sort({
        'estadisticas.puntos': -1,
        'estadisticas.victorias': -1,
        'estadisticas.golesFavor': -1
      })
      .exec();
  }

  async getProximosPartidos(nombreEquipo: string): Promise<Partido[]> {
    return this.partidoModel
      .find({
        $or: [{ equipoLocal: nombreEquipo }, { equipoVisitante: nombreEquipo }],
        estado: 'Programado',
      })
      .sort({ fechaPartido: 1 })
      .limit(10)
      .exec();
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

  async importarExcel(file: Express.Multer.File): Promise<any> {
    const workbook = xlsx.read(file.buffer, { type: 'buffer' });
    
    // 1. Process Teams
    const equiposSheet = workbook.Sheets['Equipos'];
    if (equiposSheet) {
      const equiposData: any[] = xlsx.utils.sheet_to_json(equiposSheet);
      for (const row of equiposData) {
        if (!row.nombre) continue;
        await this.equipoModel.findOneAndUpdate(
          { nombre: row.nombre },
          {
            $set: {
              nombre: row.nombre,
              liga: row.liga,
              escudo: row.escudo_url || 'https://via.placeholder.com/150',
              estadio: row.estadio || 'TBD',
              fechaCreacion: new Date(),
            }
          },
          { upsert: true, new: true }
        ).exec();
      }
    }

    // 2. Process Matches
    const partidosSheet = workbook.Sheets['Partidos'];
    if (partidosSheet) {
      const partidosData: any[] = xlsx.utils.sheet_to_json(partidosSheet);
      for (const row of partidosData) {
        if (!row.equipo_local || !row.equipo_visitante || !row.fecha_hora) continue;
        await this.partidoModel.findOneAndUpdate(
          { 
            equipoLocal: row.equipo_local,
            equipoVisitante: row.equipo_visitante,
            fechaPartido: new Date(row.fecha_hora)
          },
          {
            $set: {
              equipoLocal: row.equipo_local,
              equipoVisitante: row.equipo_visitante,
              fechaPartido: new Date(row.fecha_hora),
              competicion: row.liga,
              estadio: row.estadio || row.equipo_local || 'TBD',
              estado: 'Programado'
            }
          },
          { upsert: true, new: true }
        ).exec();
      }
    }

    // 3. Process Stats
    const statsSheet = workbook.Sheets['Estadisticas'];
    if (statsSheet) {
      const statsData: any[] = xlsx.utils.sheet_to_json(statsSheet);
      for (const row of statsData) {
        if (!row.equipo) continue;
        
        const updateData: any = {
          'estadisticas.puntos': row.puntos || 0,
          'estadisticas.partidosJugados': row.partidos_jugados || 0,
          'estadisticas.victorias': row.victorias || 0,
          'estadisticas.empates': row.empates || 0,
          'estadisticas.derrotas': row.derrotas || 0,
          'estadisticas.golesFavor': row.goles_favor || 0,
          'estadisticas.golesContra': row.goles_contra || 0,
        };

        if (row.promedio_pases !== undefined) updateData['estadisticas.promedioPases'] = row.promedio_pases;
        if (row.porcentaje_victorias !== undefined) updateData['estadisticas.porcentajeVictorias'] = row.porcentaje_victorias;
        if (row.promedio_tiros_al_arco !== undefined) updateData['estadisticas.promedioTirosAlArco'] = row.promedio_tiros_al_arco;
        if (row.promedio_faltas !== undefined) updateData['estadisticas.promedioFaltas'] = row.promedio_faltas;
        
        if (row.ultimos_partidos) {
          updateData['estadisticas.ultimosPartidos'] = String(row.ultimos_partidos).split(',').map(s => s.trim().toUpperCase());
        }

        await this.equipoModel.findOneAndUpdate(
          { nombre: row.equipo },
          { $set: updateData }
        ).exec();
      }
    }
    
    return { success: true, message: 'Importación Excel completada exitosamente. Equipos, Partidos y Estadísticas actualizadas.' };
  }
}    
