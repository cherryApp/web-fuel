import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FuelingService } from '../../service/fueling.service';
import { TranslateBase } from '../../service/translate.base';
import { Fuels, Vehicle } from '../../model/vehicle';
import { Driver } from '../../model/driver';
import { DriverService } from '../../service/driver.service';
import { ToastsManager } from 'ng2-toastr';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css']
})
export class DriverComponent extends TranslateBase<Driver> implements OnInit {
  cols = [
    {key: "name", type: "text"},
    {key: "email", type: "text"},
    {key: "phone", type: "text"},
    {key: "birthDate", type: "date"},
    {key: "address", type: "text"}
  ];
  constructor(
    private dService: DriverService,
    toaster: ToastsManager,
    vcr: ViewContainerRef
  ) {
    super(toaster, vcr);
    this.dataService = dService;
    this.entityName = 'sofőr';
    this.list = dService.list;
  }

  ngOnInit() {
    this.listSubscribe = this.dService.all.subscribe(
      list => this.list = this.dService.list
    );
  }

  ngOnDestroy() {
    this.listSubscribe.unsubscribe();
  }
}

