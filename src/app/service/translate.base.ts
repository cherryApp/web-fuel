import { TranslateService } from './translate.service';
import { ToastsManager } from 'ng2-toastr';
import { ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

/**
 * Az összes oldal komponense ettől a komponens osztálytól származik.
 * Itt definiáltuk a fordításhoz és adatfrissítéshez szükséges alapvető
 * metódusokat.
 */
export class TranslateBase<T> {
  /**
   * Alapértelmezetten a magyar nyelvet állítjuk be.
   */
  trList: {} = TranslateService.huHU;

  /**
   * Az adatok általános listája, generikus típussal.
   */
  public list: T[] = [];

  /**
   * Figyelhető objektum a listához.
   */
  public listSubscribe: Subscription;

  /**
   * Oszlopok definíciója a táblázatos megjelenítéshez.
   */
  public cols: Array<any>;

  /**
   * Az adatokat biztosító szolgáltatás, amely mindig eltérő.
   */
  public dataService: any;

  /**
   * Az entitás neve.
   */
  public entityName: string;

  /**
   *
   * @param toaster toast üzenetek szolgáltatása.
   * @param vcr a megjelenítő konténer referenciája.
   */
  constructor(
    public toaster: ToastsManager,
    public vcr: ViewContainerRef
  ) {
    this.toaster.setRootViewContainerRef(vcr);
  }

  /**
   * Objektum hozzáadása.
   * @param row új objektum.
   */
  onAdd(row): void {
    this.dataService.add(row)
      .then(
        ok => this.toaster.success(`Új ${this.entityName} létrehozva`, `Sikeres művelet`),
        err => this.toaster.error(`A ${this.entityName} nem jött létre.`, `Hiba`)
      );
  }

  /**
   * Objektum frissítése.
   * @param row frissített adatok.
   */
  onUpdate(row): void {
    this.dataService.update(row)
      .then( ok => this.toaster.success(`${this.entityName} frissítve`, `Frissítve`) )
      .catch( err => this.toaster.error(`A ${this.entityName} nem frissült.`, 'Hiba') );
  }

  /**
   * Objektum törlése.
   * @param row törlendő objektum.
   */
  onDelete(row): void {
    this.dataService.remove(row)
      .then( ok => this.toaster.success(`${this.entityName} törölve`, 'Törölve') )
      .catch( err => this.toaster.error(`A ${this.entityName} nem törlődött.`, 'Hiba') );
  }
}
