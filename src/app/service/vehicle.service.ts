import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from '@firebase/util';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class VehicleService {
  endPoint: string = "vehicle";
  constructor(private db: AngularFireDatabase) {
    this.db.list(this.endPoint).valueChanges().subscribe(
      values => console.log(values),
      err => console.error(err),
      () => console.info("end")
    );
  }

  getAll(): any {
    return this.db.list(this.endPoint).valueChanges();
  }

}
