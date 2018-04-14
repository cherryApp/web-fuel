import { Component, OnInit } from '@angular/core';
import { FuelingService } from '../../service/fueling.service';
import { Observable, Subscribe } from '@firebase/util';
import { TranslateBase } from '../../service/translate.base';
import { Fuels, Vehicle } from '../../model/vehicle';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { Driver } from '../../model/driver';
import { DriverService } from '../../service/driver.service';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css']
})
export class DriverComponent extends TranslateBase implements OnInit {
  list: Driver[] = [];
  listSubscribe: Subscription;
  cols: Array<{key: string, type: string, options?: any[]}> = [
    {key: "name", type: "text"},
    {key: "email", type: "text"},
    {key: "phone", type: "text"},
    {key: "birthDate", type: "date"},
    {key: "address", type: "text"}
  ];
  constructor(
    private dService: DriverService
  ) {
    super();
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

  onAdd(row): void {
    this.dService.add(row).then(
      ok => {
        console.log("Fueling created.", ok);
      },
      err => console.error(err)
    );
  }

  onUpdate(row): void {
    console.log("update", row);
    this.dService.update(row);
  }

  onDelete(row): void {
    console.log("delete", row);
    this.dService.remove(row);
  }

}

