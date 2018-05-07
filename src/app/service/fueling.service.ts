import { Injectable, OnInit } from '@angular/core';
import { BaseService } from './base.service';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class FuelingService extends BaseService {

  /**
   * A távoli objektum végpontja.
   */
  endPoint: string = 'fueling';

  /**
   * Példányosítás során feliratkozik a távoli adatbázis objektum módosulásaira.
   * @param db a távoli adatbázis elérése.
   */
  constructor(db: AngularFireDatabase) {
    super(db, 'fueling');
  }

}

