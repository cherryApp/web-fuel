import { Component, OnInit, OnDestroy, ViewContainerRef } from '@angular/core';
import { VehicleService } from '../../service/vehicle.service';
import { Observable, Subscribe } from '@firebase/util';
import { TranslateBase } from '../../service/translate.base';
import { Fuels, Vehicle } from '../../model/vehicle';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { ToastsManager } from 'ng2-toastr';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent extends TranslateBase<Vehicle>
  implements OnInit, OnDestroy {
  deleteMessage: string = `
    <div><span>Biztosan törli?</span></div>
    <div class="row">
      <div class="col-12">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <button class="btn btn-light toast-ok-btn">&nbsp;&nbsp;igen&nbsp;&nbsp;</button>
        &nbsp;&nbsp;
        <button class="btn btn-light toast-cancel-btn">&nbsp;&nbsp;nem&nbsp;&nbsp;</button>
      </div>
    </div>
  `;

  cols = [
    {key: "lp", type: "text"},
    {key: "manufacturer", type: "text"},
    {key: "type", type: "text"},
    {key: "consumption", type: "number"},
    {key: "fuelType", type: "select", options: Fuels},
    {key: "year", type: "number"}
  ];
  constructor(
    private vService: VehicleService,
    toaster: ToastsManager,
    vcr: ViewContainerRef
  ) {
    super(toaster, vcr);
    this.dataService = vService;
    this.entityName = 'sofőr';
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
}
