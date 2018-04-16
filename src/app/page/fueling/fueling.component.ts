import { Component, OnInit } from '@angular/core';
import { FuelingService } from '../../service/fueling.service';
import { Observable, Subscribe } from '@firebase/util';
import { TranslateBase } from '../../service/translate.base';
import { Fuels, Vehicle } from '../../model/vehicle';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { Fueling } from '../../model/fueling';
import { VehicleService } from '../../service/vehicle.service';
import { DriverService } from '../../service/driver.service';

@Component({
  selector: 'app-fueling',
  templateUrl: './fueling.component.html',
  styleUrls: ['./fueling.component.css']
})
export class FuelingComponent extends TranslateBase implements OnInit {
  list: Fueling[] = [];
  listSubscribe: Subscription;
  vSubscribe: Subscription;
  vList: Vehicle[] = [];
  vOptions: any[] = [];
  cols: Array<{key: string, type: string, options?: any[]}> = [
    {key: "vehicleId", type: "select", options: []},
    {key: "driverId", type: "select", options: []},
    {key: "time", type: "date"},
    {key: "amount", type: "number"}
  ];
  constructor(
    private fService: FuelingService,
    private vService: VehicleService,
    private dService: DriverService
  ) {
    super();
    this.list = fService.list;
    this.cols[0].options = vService.vOptions;
    this.cols[1].options = dService.vOptions;
  }

  ngOnInit() {
    this.listSubscribe = this.fService.all.subscribe(
      list => {
        this.list = this.fService.list;
        console.log(list);
      }
    );
    this.vSubscribe = this.vService.all.subscribe(
      list => {
        this.cols[0].options = this.vService.vOptions;
      }
    );
    this.dService.all.subscribe(
      list => this.cols[1].options = this.dService.vOptions
    )
  }

  ngOnDestroy() {
    this.listSubscribe.unsubscribe();
    this.vSubscribe.unsubscribe();
  }

  onAdd(row): void {
    this.fService.add(row).then(
      ok => {
        console.log("Fueling created.", ok);
      },
      err => console.error(err)
    );
  }

  onUpdate(row): void {
    console.log("update", row);
    this.fService.update(row);
  }

  onDelete(row): void {
    console.log("delete", row);
    this.fService.remove(row);
  }

}
