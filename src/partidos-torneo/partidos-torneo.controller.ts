import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PartidosTorneoService } from './partidos-torneo.service';
import { CreatePartidoTorneoDto } from './dto/create-partido-torneo.dto';
import { UpdatePartidoTorneoDto } from './dto/update-partido-torneo.dto';

@Controller('partidos-torneo')
export class PartidosTorneoController {
  constructor(private readonly partidosTorneoService: PartidosTorneoService) {}

  @Post()
  create(@Body() createPartidoTorneoDto: CreatePartidoTorneoDto) {
    return this.partidosTorneoService.create(createPartidoTorneoDto);
  }

  @Get()
  findAll() {
    return this.partidosTorneoService.findAll();
  }

  @Get('torneo/:torneoId')
  findByTorneo(@Param('torneoId') torneoId: string) {
    return this.partidosTorneoService.findByTorneo(torneoId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.partidosTorneoService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePartidoTorneoDto: UpdatePartidoTorneoDto) {
    return this.partidosTorneoService.update(id, updatePartidoTorneoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.partidosTorneoService.remove(id);
  }
}
