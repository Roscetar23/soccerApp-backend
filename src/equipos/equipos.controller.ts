import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { EquiposService } from './equipos.service';
import { CreateEquipoDto } from './dto/create-equipo.dto';
import { UpdateEquipoDto } from './dto/update-equipo.dto';
import { CreateEstadisticasDto } from './dto/create-estadisticas.dto';

@Controller('equipos')
export class EquiposController {
  constructor(private readonly equiposService: EquiposService) {}

  @Post()
  create(@Body() createEquipoDto: CreateEquipoDto) {
    return this.equiposService.create(createEquipoDto);
  }

  @Get()
  findAll(@Query('liga') liga?: string, @Query('userId') userId?: string) {
    return this.equiposService.findAll(liga, userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.equiposService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEquipoDto: UpdateEquipoDto) {
    return this.equiposService.update(id, updateEquipoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.equiposService.remove(id);
  }

  @Post(':id/estadisticas')
  updateEstadisticas(
    @Param('id') id: string,
    @Body() createEstadisticasDto: CreateEstadisticasDto,
  ) {
    return this.equiposService.updateEstadisticas(id, createEstadisticasDto);
  }

  @Get(':id/estadisticas')
  getEstadisticas(@Param('id') id: string) {
    return this.equiposService.getEstadisticas(id);
  }
}
