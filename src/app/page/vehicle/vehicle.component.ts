import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../../service/vehicle.service';
import { Observable } from '@firebase/util';
import { TranslateBase } from '../../service/translate.base';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent extends TranslateBase implements OnInit {
  list: Observable<any>;
  newRow: any = {};
  cols: Array<string> = [
    "lp",
    "manufacturer",
    "type",
    "consumption",
    "fuelType",
    "year"
  ];
  constructor(private vService: VehicleService) {
    super();
    console.log(this.trList);
    this.list = this.vService.getAll();
  }

  ngOnInit() {
  }

  addVehicle(): void {
    console.log(this.newRow);
  }

}
