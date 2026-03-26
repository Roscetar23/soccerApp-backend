import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Mundial, MundialDocument } from './entities/mundial.entity';
import * as xlsx from 'xlsx';

const SEED_DATA = {
  edicion: 'Mundial 2026',
  sedes: [
    { nombre: 'Estadio Azteca', ciudad: 'Ciudad de México', pais: 'México', capacidad: '83,264', imagen: '🏟️' },
    { nombre: 'MetLife Stadium', ciudad: 'Nueva York/Nueva Jersey', pais: 'Estados Unidos', capacidad: '82,500', imagen: '🏟️' },
    { nombre: 'BC Place', ciudad: 'Vancouver', pais: 'Canadá', capacidad: '54,500', imagen: '🏟️' },
    { nombre: 'SoFi Stadium', ciudad: 'Los Ángeles', pais: 'Estados Unidos', capacidad: '70,240', imagen: '🏟️' },
    { nombre: 'Estadio Akron', ciudad: 'Guadalajara', pais: 'México', capacidad: '48,071', imagen: '🏟️' },
    { nombre: 'BMO Field', ciudad: 'Toronto', pais: 'Canadá', capacidad: '30,000', imagen: '🏟️' },
  ],
  clasificados: [
    { id: 'USA', nombre: 'Estados Unidos', region: 'CONCACAF (Anfitrión)', bandera: '🇺🇸' },
    { id: 'MEX', nombre: 'México', region: 'CONCACAF (Anfitrión)', bandera: '🇲🇽' },
    { id: 'CAN', nombre: 'Canadá', region: 'CONCACAF (Anfitrión)', bandera: '🇨🇦' },
    { id: 'ARG', nombre: 'Argentina', region: 'CONMEBOL', bandera: '🇦🇷' },
    { id: 'FRA', nombre: 'Francia', region: 'UEFA', bandera: '🇫🇷' },
    { id: 'ENG', nombre: 'Inglaterra', region: 'UEFA', bandera: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
  ],
  grupos: [
    { nombre: 'Grupo A', equipos: ['México (MEX)', 'Por Definir', 'Por Definir', 'Por Definir'] },
    { nombre: 'Grupo B', equipos: ['Canadá (CAN)', 'Por Definir', 'Por Definir', 'Por Definir'] },
    { nombre: 'Grupo C', equipos: ['USA (USA)', 'Por Definir', 'Por Definir', 'Por Definir'] },
  ]
};

@Injectable()
export class MundialService {
  constructor(
    @InjectModel(Mundial.name) private mundialModel: Model<MundialDocument>,
  ) {}

  async getOrSeedMundialData(): Promise<Mundial> {
    const config = await this.mundialModel.findOne({ edicion: 'Mundial 2026' }).exec();
    
    // Si ya existe la base de datos, simplemente la servimos (Base de datos real).
    if (config) {
      return config;
    }

    // Si es la primera vez que se consulta y está vacía, hacemos el Seed nativo.
    const newConfig = new this.mundialModel(SEED_DATA);
    return newConfig.save();
  }

  async importarExcel(file: Express.Multer.File): Promise<{ message: string; sedesImportadas: number; gruposImportados: number; clasificadosImportados: number }> {
    const workbook = xlsx.read(file.buffer, { type: 'buffer' });

    const sedesSheet = workbook.Sheets['Sedes'];
    const gruposSheet = workbook.Sheets['Grupos'];
    const clasificadosSheet = workbook.Sheets['Clasificados'];

    let sedes: any[] = [];
    if (sedesSheet) {
      sedes = xlsx.utils.sheet_to_json(sedesSheet).map((row: any) => ({
        nombre: row.nombre || '',
        ciudad: row.ciudad || '',
        pais: row.pais || '',
        capacidad: String(row.capacidad || ''),
        imagen: row.imagen || '🏟️'
      }));
    }

    let clasificados: any[] = [];
    if (clasificadosSheet) {
      clasificados = xlsx.utils.sheet_to_json(clasificadosSheet).map((row: any) => ({
        id: String(row.id || ''),
        nombre: row.nombre || '',
        region: row.region || '',
        bandera: row.bandera || '🏳️'
      }));
    }

    let grupos: any[] = [];
    if (gruposSheet) {
      const parsedGroups = xlsx.utils.sheet_to_json(gruposSheet);
      grupos = parsedGroups.map((row: any) => ({
        nombre: row.grupo || row.nombre || '',
        equipos: (row.equipos || '').split(',').map(e => e.trim()).filter(Boolean)
      }));
    }

    const edicion = 'Mundial 2026';
    
    // Si mandamos un array vacío (porque la pestaña falta), no borramos lo que ya existe.
    // Solo actualizamos lo que viene.
    const updates: any = {};
    if (sedes.length > 0) updates.sedes = sedes;
    if (clasificados.length > 0) updates.clasificados = clasificados;
    if (grupos.length > 0) updates.grupos = grupos;

    await this.mundialModel.findOneAndUpdate(
      { edicion },
      { $set: updates },
      { upsert: true, new: true }
    );

    return {
      message: 'Datos del Mundial actualizados exitosamente en la base de datos.',
      sedesImportadas: sedes.length,
      clasificadosImportados: clasificados.length,
      gruposImportados: grupos.length
    };
  }
}
