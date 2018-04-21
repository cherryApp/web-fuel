import { Injectable, OnInit } from '@angular/core';
import { BaseService } from './base.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class VehicleService extends BaseService {

  endPoint: string = "vehicle";

  vOptions: any[] = [];
  allOptions: Subject<any> = new Subject();

  constructor(db: AngularFireDatabase) {
    super(db, 'vehicle');
    this.all.subscribe( list => {
      this.vOptions = [];
      list.forEach(element => {
        this.vOptions.push(
          {value: element.key, label: element.vehicle.lp, exact: true}
        );
      });
      this.allOptions.next(this.vOptions);
    });
  }

}
