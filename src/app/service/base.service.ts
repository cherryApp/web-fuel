import { Injectable, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from 'angularfire2/database';
import { Subject } from 'rxjs/Subject';
import { ThenableReference } from '@firebase/database-types';
import { map } from 'rxjs/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class BaseService {

  list: Array<any> = [];

  all: Observable<any>;

  test: Observable<any>;

  listRef: AngularFireList<any>;

  constructor(protected db: AngularFireDatabase, protected endPoint: string) {
    this.listRef = this.db.list(this.endPoint);
    this.all = this.db.object(this.endPoint).valueChanges().map(
      values => {
        this.list = [];
        for (let k in values) {
          let row = {key: k};
          row[this.endPoint] = values[k];
          this.list.push(row);
        }
        return this.list;
      }
    )
  }

  add(row: any): ThenableReference {
    return this.listRef.push(row);
  }

  update(row: any): Promise<any> {
    return this.db.object(this.endPoint+'/'+row.key).update(row[this.endPoint]);
  }

  remove(row: any): Promise<any> {
    return this.db.object(this.endPoint+'/'+row.key).remove();
  }

}
