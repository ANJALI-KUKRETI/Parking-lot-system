import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ParkinglotModule } from './parkinglot/parkinglot.module';

@Module({
  imports: [ParkinglotModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
