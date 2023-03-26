import { Injectable } from '@nestjs/common';

import { Parkinglot } from './parkinglot.model';
import { Car } from './car.model';
import { Slot } from './slot.model';

@Injectable()
export class ParkinglotService {
  parkinglot: Parkinglot;
  car: Car[] = [];
  slot: Slot[] = [];
  insertTotalParkinglot(no_of_slot: number) {
    const newParkinglot = new Parkinglot(no_of_slot);
    this.parkinglot = newParkinglot;
    for (let i = 1; i <= no_of_slot; i++) {
      this.slot.push(new Slot(i, true));
    }
    return this.slot;
  }

  incrementParkingLot(increment_slot: number) {
    const initialSlots = this.parkinglot.no_of_slot;
    this.parkinglot.no_of_slot = this.parkinglot.no_of_slot + increment_slot;
    for (let i = 1; i <= increment_slot; i++) {
      this.slot.push(new Slot(i + initialSlots, true));
    }
    return this.slot;
    // return this.parkinglot;
  }
  allocateCar(car_reg_no: string, car_color: string, car_owner_name: string) {
    let slotAllocated;
    for (let i = 0; i < this.parkinglot.no_of_slot; i++) {
      if (this.slot[i].vacant === true) {
        this.slot[i].vacant = false;
        slotAllocated = this.slot[i].index;
        break;
      }
    }
    const newCar = new Car(
      new Date().toString(),
      car_reg_no,
      car_color,
      car_owner_name,
      slotAllocated,
    );
    this.car.push(newCar);
    return newCar.allotedSlot;
  }
  getRegNum(color: string) {
    const temp = this.car
      .filter((c) => c.car_color === color)
      .map((c) => c.car_reg_no);
    return temp;
  }
}
