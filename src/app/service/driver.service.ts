import { Injectable, OnInit } from '@angular/core';
import { BaseService } from './base.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { Subject } from 'rxjs/Subject';

/**
 * A sofőrök adatainak szolgáltatása.
 */
@Injectable()
export class DriverService extends BaseService {
  /**
   * A távoli objektum végpontja.
   */
  endPoint: string = 'driver';

  /**
   * Lista opciók.
   */
  vOptions: any[] = [];

  /**
   * Figyelhető objektum a változások megosztására.
   */
  allOptions: Subject<any> = new Subject();

  /**
   * Példányosítás során feliratkozik a távoli adatbázis objektum módosulásaira.
   * @param db a távoli adatbázis elérése.
   */
  constructor(db: AngularFireDatabase) {
    super(db, 'driver');

    this.all.subscribe( list => {
      this.vOptions = [];
      list.forEach(element => {
        this.vOptions.push(
          {value: element.key, label: element.driver.name, exact: true}
        );
      });
      this.allOptions.next(this.vOptions);
    });
  }

}

