import { TranslateService } from './translate.service';
import { ToastsManager } from 'ng2-toastr';
import { ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

export class TranslateBase<T> {
  trList: {} = TranslateService.huHU;
  public list: T[] = [];
  public listSubscribe: Subscription;
  public cols: Array<any>;
  public dataService: any;
  public entityName: string;

  constructor(
    public toaster: ToastsManager,
    public vcr: ViewContainerRef
  ) {
    this.toaster.setRootViewContainerRef(vcr);
  }

  onAdd(row): void {
    this.dataService.add(row)
      .then(
        ok => this.toaster.success(`Új ${this.entityName} létrehozva`, `Sikeres művelet`),
        err => this.toaster.error(`A ${this.entityName} nem jött létre.`, `Hiba`)
      );
  }

  onUpdate(row): void {
    this.dataService.update(row)
      .then( ok => this.toaster.success(`${this.entityName} frissítve`, `Frissítve`) )
      .catch( err => this.toaster.error(`A ${this.entityName} nem frissült.`, 'Hiba') );
  }

  onDelete(row): void {
    this.dataService.remove(row)
      .then( ok => this.toaster.success(`${this.entityName} törölve`, 'Törölve') )
      .catch( err => this.toaster.error(`A ${this.entityName} nem törlődött.`, 'Hiba') );
  }
}
