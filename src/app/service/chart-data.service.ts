import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { zip } from 'rxjs/observable/zip';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { VehicleService } from './vehicle.service';
import { DriverService } from './driver.service';
import { FuelingService } from './fueling.service';
import { Subject } from 'rxjs/Subject';

/**
 * A chart számára kéri le és fésüli össze a szükséges adatokat.
 */
@Injectable()
export class ChartDataService {

  /**
   * Kötegelt feliratkozás egyszerre több listára.
   */
  zipSubscription: Subscription;

  /**
   * Figyelhető objektum a megfigyelő osztáloyok számára.
   */
  dataSubject: Subject<any> = new Subject();

  /**
   * Objektum típusok szerint rendezett és cache -elt chart adatok.
   */
  cachedData: {drivers: Array<any>, fuelings: Array<any>, vehicles: Array<any>} =
    {
      drivers: [],
      fuelings: [],
      vehicles: []
    };

  /**
   *
   * @param vService járművek szolgáltatása.
   * @param dService sofőrök szolgáltatása.
   * @param fService tankolások szolgáltatása.
   */
  constructor(
    private vService: VehicleService,
    private dService: DriverService,
    private fService: FuelingService
  ) {

    this.zipSubscription = combineLatest(
      this.vService.all,
      this.dService.all,
      this.fService.all
    ).subscribe(
      zipData => {
        this.cachedData.drivers = zipData[1];
        this.cachedData.fuelings = zipData[2];
        this.cachedData.vehicles = zipData[0];

        this.dataSubject.next(this.cachedData);
      }
    );
  }

}
