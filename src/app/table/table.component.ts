import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

/**
 * CRUD műveleteket biztosító táblázat komponens.
 */
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  /**
   * A megjelenített lista.
   */
  @Input('dataList') list: Array<any>;

  /**
   * Új sor adatai.
   */
  newRow: any = {};

  /**
   * Oszlopok definíciója.
   */
  @Input() cols: Array<any>;

  /**
   * Sorok listája.
   */
  @Input() trList: any;

  /**
   * Amennyiben beágyazott adatokat kapunk, a beágyazott adatforrás neve.
   */
  @Input() subObject: string;

  /**
   * Oszloplista beállítása esetén futó szetter.
   */
  @Input() set colList(list) {
    //
  }

  /**
   * Esemény, ha hozzáadnak egy új sort.
   */
  @Output() add: EventEmitter<any> = new EventEmitter();

  /**
   * Esemény, ha eltávolítanak egy sort.
   */
  @Output() remove: EventEmitter<any> = new EventEmitter();

  /**
   * Esemény, ha frissítenek egy adatsort.
   */
  @Output() update: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  /**
   * Az adott kulcsú adatot olvassa ki az adatsorból.
   * Ha meg van adva beágyazott objektum név akkor abból olvas, ha nincs
   * akkor a gyökér objektumból.
   * @param row az adatsor.
   * @param key a kiolvasandó érték kulcsa.
   */
  getModel(row, key): any {
    return this.subObject ? row[this.subObject][key] : row[key];
  }

  /**
   * Az adott kulcsú adatot írja felül adatsorban.
   * Ha meg van adva beágyazott objektum név akkor abba ír, ha nincs
   * akkor a gyökér objektuma.
   * @param $event az esemény, amely jelen esetben a frissített adat.
   * @param row az adatsor.
   * @param key a frissített adat kulcsa az adatorban.
   */
  setModel($event, row, key): void {
    if (this.subObject) {
      row[this.subObject][key] = $event;
    } else {
      row[key] = $event;
    }
  }

  /**
   * Legördülő (select) listák opcióinak értékeit olvassa ki.
   * @param option az opció.
   */
  getOptionValue(option): any {
    return option.label ? option.value : option;
  }

  /**
   * Legördülő (select) listák opcióinak címkéit olvassa ki.
   * @param option az opció.
   */
  getOptionLabel(option): string {
    return option.label ? option.label : option;
  }

  /**
   * Sor hozzáadása.
   */
  addRow(): void {
    this.add.emit(this.newRow);
    this.newRow = {};
  }

  /**
   * Sor frissítése.
   * @param row a frissített adatsor.
   */
  updateRow(row): void {
    this.update.emit(row);
  }

  /**
   * Sor törlése.
   * @param row a törölni kívánt adatsor.
   */
  deleteRow(row): void {
    this.remove.emit(row);
  }

}
