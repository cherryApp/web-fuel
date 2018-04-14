import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from '@firebase/util';
import { AngularFireDatabase } from 'angularfire2/database';
import { Vehicle } from '../model/vehicle';
import { Subject } from 'rxjs/Subject';
import { ThenableReference } from '@firebase/database-types';

@Injectable()
export class VehicleService implements OnInit {
  endPoint: string = "vehicle";
  all: Subject<any> = new Subject();
  constructor(private db: AngularFireDatabase) {
    this.db.object(this.endPoint).valueChanges().subscribe(
      values => {
        console.log("values", values);
        let list = [];
        for (let k in values) {
          list.push({
            key: k,
            vehicle: values[k]
          });
        }
        this.all.next(list);
      },
      err => console.error(err),
      () => console.info("end")
    );
  }

  ngOnInit() {

  }

  add(vehicle: Vehicle): ThenableReference {
    return this.db.list(this.endPoint).push(vehicle);
  }

  update(row: any): Promise<any> {
    return this.db.object(this.endPoint+'/'+row.key).update(row.vehicle);
  }

  remove(row: any): Promise<any> {
    return this.db.object(this.endPoint+'/'+row.key).remove();
  }

}
