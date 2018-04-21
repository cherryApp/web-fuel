import { Component, OnInit, OnDestroy, ViewContainerRef } from '@angular/core';
import { VehicleService } from '../../service/vehicle.service';
import { Observable, Subscribe } from '@firebase/util';
import { TranslateBase } from '../../service/translate.base';
import { Fuels, Vehicle } from '../../model/vehicle';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { ToastsManager } from 'ng2-toastr';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent extends TranslateBase
  implements OnInit, OnDestroy {
  list: Vehicle[];
  test: any = {};
  newRow: any = {};
  signToDelete: any;
  listSubscribe: Subscription;

  deleteMessage: string = `
    <div><span>Biztosan törli?</span></div>
    <div class="row">
      <div class="col-12">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <button class="btn btn-light toast-ok-btn">&nbsp;&nbsp;igen&nbsp;&nbsp;</button>
        &nbsp;&nbsp;
        <button class="btn btn-light toast-cancel-btn">&nbsp;&nbsp;nem&nbsp;&nbsp;</button>
      </div>
    </div>
  `;

  cols: Array<{}> = [
    {key: "lp", type: "text"},
    {key: "manufacturer", type: "text"},
    {key: "type", type: "text"},
    {key: "consumption", type: "number"},
    {key: "fuelType", type: "select", options: Fuels},
    {key: "year", type: "number"}
  ];
  constructor(
    private vService: VehicleService,
    private toaster: ToastsManager,
    private vcr: ViewContainerRef
  ) {
    super();
    this.list = vService.list;
    console.log( vcr.element.nativeElement );
    this.toaster.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.listSubscribe = this.vService.all.subscribe(
      list => this.list = this.vService.list
    );
    this.test = this.vService.test;
    const self = this;
    window.addEventListener( 'click', (ev) => {
      self.toastListener(ev);
    })
  }

  ngOnDestroy() {
    this.listSubscribe.unsubscribe();
  }

  addVehicle(row): void {
    this.vService.add(row)
      .then(
        ok => this.toaster.success('Új jármű létrehozva', 'Sikeres művelet'),
        err => this.toaster.error('A jármű nem jött létre.', 'Hiba')
      );
  }

  onUpdate(row): void {
    this.vService.update(row)
      .then( ok => this.toaster.success('Jármű frissítve', 'Frissítve') )
      .catch( err => this.toaster.error('A jármű nem frissült.', 'Hiba') );
  }

  onDelete(row): void {
    this.signToDelete = row;
    this.toaster.info(this.deleteMessage, null,
      { enableHTML: true, dismiss: 'controlled' }
    ).then( res => console.log(res) );
  }

  confirmedDelete(): void {
    this.vService.remove(this.signToDelete)
      .then( ok => this.toaster.success('Jármű törölve', 'Törölve') )
      .catch( err => this.toaster.error('A jármű nem törlődött.', 'Hiba') );
  }

  toastListener(ev: MouseEvent): void {
    if ( (ev.target as Element).classList.contains('toast-ok-btn') ) {
      this.confirmedDelete();
    }
  }

  trackByFn(item) {
    return Math.round(Math.random()*Math.pow(10, 10));
  }

}
