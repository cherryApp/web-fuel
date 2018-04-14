import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../../service/vehicle.service';
import { Observable } from '@firebase/util';
import { TranslateBase } from '../../service/translate.base';
import { Fuels, Vehicle } from '../../model/vehicle';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent extends TranslateBase implements OnInit {
  list: Array<Vehicle> = [];
  newRow: any = {};
  cols: Array<{}> = [
    {key: "lp", type: "text"},
    {key: "manufacturer", type: "text"},
    {key: "type", type: "text"},
    {key: "consumption", type: "number"},
    {key: "fuelType", type: "select", options: Fuels},
    {key: "year", type: "number"}
  ];
  constructor(private vService: VehicleService) {
    super();
    this.vService.all.subscribe(
      values => {
        console.log(values);
        this.list = values;
        console.log(this.list);
      },
      err => console.error(err),
      () => console.log("vehicle subject ended")
    );
  }

  ngOnInit() {
  }

  addVehicle(): void {
    console.log(this.newRow);
    this.vService.add(this.newRow).then(
      ok => console.log(ok),
      err => console.error(err)
    );
  }

  onUpdate(row): void {
    console.log("update", row);
    this.vService.update(row);
  }

  onDelete(row): void {
    console.log("delete", row);
    this.vService.remove(row);
  }

}
