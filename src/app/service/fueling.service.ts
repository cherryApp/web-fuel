import { Injectable, OnInit } from '@angular/core';
import { BaseService } from './base.service';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class FuelingService extends BaseService {
  endPoint: string = 'fueling';
  constructor(db: AngularFireDatabase) {
    super(db, 'fueling');
  }

}

