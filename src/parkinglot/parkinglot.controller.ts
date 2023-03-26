import { Controller, Post, Body, Patch, Get, Param } from '@nestjs/common';
import { ParkinglotService } from './parkinglot.service';

@Controller('parking_lot')
export class ParkinglotController {
  constructor(private parkinglotService: ParkinglotService) {}

  @Post()
  addInitialParkingLots(@Body('no_of_slot') parkingTotal: number) {
    const total = this.parkinglotService.insertTotalParkinglot(parkingTotal);
    return { total_slot: total };
  }

  @Patch()
  increaseParkingLots(@Body('increment_slot') increaseBy: number) {
    const total = this.parkinglotService.incrementParkingLot(increaseBy);
    return { total_slot: total };
  }

  @Post('park')
  parkCar(
    @Body('car_reg_no') car_reg_no: string,
    @Body('car_color') car_color: string,
    @Body('car_owner_name') car_owner_name: string,
  ) {
    const allocated_slot = this.parkinglotService.allocateCar(
      car_reg_no,
      car_color,
      car_owner_name,
    );
    return { allocated_slot_number: allocated_slot };
  }

  @Get('registration_numbers/:color')
  getCarsRegNumbers(@Param('color') color: string) {
    const regArr = this.parkinglotService.getRegNum(color);
    return { arr: regArr };
  }
}
