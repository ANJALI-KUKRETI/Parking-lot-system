import { Module } from '@nestjs/common';
import { ParkinglotController } from './parkinglot.controller';
import { ParkinglotService } from './parkinglot.service';

@Module({
  controllers: [ParkinglotController],
  providers: [ParkinglotService],
})
export class ParkinglotModule {}
