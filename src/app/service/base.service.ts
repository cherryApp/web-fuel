import { Injectable, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from 'angularfire2/database';
import { Subject } from 'rxjs/Subject';
import { ThenableReference } from '@firebase/database-types';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

/**
 * Alap szolgáltatás a lista alapú adatok kezelésére.
 */
@Injectable()
export class BaseService {

  /**
   * Az adatok listája.
   */
  list: Array<any> = [];

  /**
   * Az összes adat.
   */
  all: Observable<any>;

  /**
   * Test adatok.
   */
  test: Observable<any>;

  /**
   * Lista alapú referencia a távoli objektumra.
   */
  listRef: AngularFireList<any>;

  /**
   *
   * @param db a távoli adatbázist kezelő szolgáltatás.
   * @param endPoint az adatbázis objektum címe az adatbázison belül.
   */
  constructor(protected db: AngularFireDatabase, protected endPoint: string) {
    this.listRef = this.db.list(this.endPoint);
    this.all = this.db.object(this.endPoint).valueChanges()
      .pipe(
        map( values => {
          this.list = [];
          for (let k in values) {
            let row = {key: k};
            row[this.endPoint] = values[k];
            this.list.push(row);
          }
          return this.list;
        })
      );

    this.test = this.db.list(this.endPoint).snapshotChanges();
  }

  /**
   * Új objektum beszúrása a távoli adatbázisba.
   * @param row az új objektum.
   */
  add(row: any): ThenableReference {
    return this.listRef.push(row);
  }

  /**
   * Adatok frissítése egy távoli entitáson.
   * @param row a frissített objektum - adatok.
   */
  update(row: any): Promise<any> {
    return this.db.object(this.endPoint+'/'+row.key).update(row[this.endPoint]);
  }

  /**
   * Objektum törlése a távoli adatbázisból.
   * @param row a törlendő objektum.
   */
  remove(row: any): Promise<any> {
    return this.db.object(this.endPoint+'/'+row.key).remove();
  }

}
