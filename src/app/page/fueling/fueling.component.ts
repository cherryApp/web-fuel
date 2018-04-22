import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FuelingService } from '../../service/fueling.service';
import { Observable, Subscribe } from '@firebase/util';
import { TranslateBase } from '../../service/translate.base';
import { Fuels, Vehicle } from '../../model/vehicle';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { Fueling } from '../../model/fueling';
import { VehicleService } from '../../service/vehicle.service';
import { DriverService } from '../../service/driver.service';
import { ToastsManager } from 'ng2-toastr';

@Component({
  selector: 'app-fueling',
  templateUrl: './fueling.component.html',
  styleUrls: ['./fueling.component.css']
})
export class FuelingComponent extends TranslateBase<Fueling> implements OnInit {
  vSubscribe: Subscription;
  vList: Vehicle[] = [];
  vOptions: any[] = [];
  cols = [
    {key: "vehicleId", type: "select", options: []},
    {key: "driverId", type: "select", options: []},
    {key: "time", type: "date"},
    {key: "amount", type: "number"}
  ];
  constructor(
    private fService: FuelingService,
    private vService: VehicleService,
    private dService: DriverService,
    toaster: ToastsManager,
    vcr: ViewContainerRef
  ) {
    super(toaster, vcr);
    this.dataService = fService;
    this.entityName = 'tankolás';
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
}
