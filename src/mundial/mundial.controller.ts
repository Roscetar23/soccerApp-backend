import { Controller, Get, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MundialService } from './mundial.service';

@Controller('mundial')
export class MundialController {
  constructor(private readonly mundialService: MundialService) {}

  @Get()
  async getMundialData() {
    return this.mundialService.getOrSeedMundialData();
  }

  @Post('importar-excel')
  @UseInterceptors(FileInterceptor('file'))
  async importarExcel(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new Error('No se ha proporcionado un archivo Excel.');
    }
    return this.mundialService.importarExcel(file);
  }
}
