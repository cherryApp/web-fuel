import { Component, OnInit, OnDestroy } from '@angular/core';
import { VehicleService } from '../../service/vehicle.service';
import { Observable, Subscribe } from '@firebase/util';
import { TranslateBase } from '../../service/translate.base';
import { Fuels, Vehicle } from '../../model/vehicle';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent extends TranslateBase
  implements OnInit, OnDestroy {
  list: Vehicle[];
  newRow: any = {};
  listSubscribe: Subscription;
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
    this.list = vService.list;
  }

  ngOnInit() {
    this.listSubscribe = this.vService.all.subscribe(
      list => this.list = this.vService.list
    );
  }

  ngOnDestroy() {
    this.listSubscribe.unsubscribe();
  }

  addVehicle(row): void {
    this.vService.add(row).then(
      ok => {
        console.log("Vehicle created.", ok);
      },
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
