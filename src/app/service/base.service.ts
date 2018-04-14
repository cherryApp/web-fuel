import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from '@firebase/util';
import { AngularFireDatabase } from 'angularfire2/database';
import { Vehicle } from '../model/vehicle';
import { Subject } from 'rxjs/Subject';
import { ThenableReference } from '@firebase/database-types';

@Injectable()
export class BaseService implements OnInit {
  refreshList(): any {
    this.all.next(this.list);
  }

  list: Array<any> = [];

  all: Subject<any> = new Subject();
  constructor(protected db: AngularFireDatabase, protected endPoint: string) {
    this.db.object(this.endPoint).valueChanges().subscribe(
      values => {
        console.log("values", values);
        this.list = [];
        for (let k in values) {
          let row = {key: k};
          row[this.endPoint] = values[k];
          this.list.push(row);
        }
        this.all.next(this.list);
      },
      err => console.error(err),
      () => console.info("end")
    );
  }

  ngOnInit() {

  }

  add(row: any): ThenableReference {
    return this.db.list(this.endPoint).push(row);
  }

  update(row: any): Promise<any> {
    return this.db.object(this.endPoint+'/'+row.key).update(row[this.endPoint]);
  }

  remove(row: any): Promise<any> {
    return this.db.object(this.endPoint+'/'+row.key).remove();
  }

}
