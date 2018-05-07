import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FuelingService } from '../../service/fueling.service';
import { TranslateBase } from '../../service/translate.base';
import { Fuels, Vehicle } from '../../model/vehicle';
import { Driver } from '../../model/driver';
import { DriverService } from '../../service/driver.service';
import { ToastsManager } from 'ng2-toastr';

/**
 * A Driver (sofőr) entitásokat kezelő komponens.
 */
@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css']
})
export class DriverComponent extends TranslateBase<Driver> implements OnInit {
  /**
   * A táblázatban megjelenő oszlopok fejlécei és típusa.
   */
  cols = [
    {key: "name", type: "text"},
    {key: "email", type: "text"},
    {key: "phone", type: "text"},
    {key: "birthDate", type: "date"},
    {key: "address", type: "text"}
  ];

  /**
   *
   * @param dService a Driver -eket kezelő szolgáltatás.
   * @param toaster a toast üzenetek megjelenítéséért felelős szolgáltatás.
   * @param vcr a megjelenítő konténer referenciája.
   */
  constructor(
    private dService: DriverService,
    toaster: ToastsManager,
    vcr: ViewContainerRef
  ) {
    super(toaster, vcr);
    this.dataService = dService;
    this.entityName = 'sofőr';
    this.list = dService.list;
  }

  /**
   * Inicializálás során feliratkozunk a Driver lista figyelésére.
   */
  ngOnInit() {
    this.listSubscribe = this.dService.all.subscribe(
      list => this.list = this.dService.list
    );
  }

  /**
   * Törlés előtt töröljük a figyelőket.
   */
  ngOnDestroy() {
    this.listSubscribe.unsubscribe();
  }
}

