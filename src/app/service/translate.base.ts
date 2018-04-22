import { TranslateService } from './translate.service';
import { ToastsManager } from 'ng2-toastr';
import { ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

export class TranslateBase<T> {
  trList: {} = TranslateService.huHU;
  protected list: T[] = [];
  protected listSubscribe: Subscription;
  protected cols: Array<{key: string, type: string, options?: any[]}>;
  protected dataService: any;
  protected entityName: string;

  constructor(
    protected toaster: ToastsManager,
    protected vcr: ViewContainerRef
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
