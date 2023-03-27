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

  @Get('slot_numbers/:color')
  getSlotNum(@Param('color') color: string) {
    const slotArr = this.parkinglotService.getSlotNum(color);
    return { arr: slotArr };
  }

  @Post('clearBySlot')
  freeLot(@Body('slot_number') slot_number: number) {
    const freedSlot = this.parkinglotService.clearSlot(slot_number);
    return { freed_slot_number: freedSlot };
  }

  @Post('clearByReg')
  freeLotByReg(@Body('car_registration_no') car_registration_no: string) {
    const freedSlot =
      this.parkinglotService.clearSlotByReg(car_registration_no);
    return { freed_slot_number: freedSlot };
  }

  @Get('status')
  fetchOccupiedSlots() {
    const occupiedSlots = this.parkinglotService.fetchOccSlots();
    return occupiedSlots;
  }
}
