import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MundialService } from './mundial.service';
import { MundialController } from './mundial.controller';
import { Mundial, MundialSchema } from './entities/mundial.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Mundial.name, schema: MundialSchema }]),
  ],
  controllers: [MundialController],
  providers: [MundialService],
})
export class MundialModule {}
