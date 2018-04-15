import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  // A megjelenített lista.
  @Input('dataList') list: Array<any>;

  // Új sor adatai.
  newRow: any = {};

  // Input értékek.
  @Input() cols: Array<any>;
  @Input() trList: any;
  @Input() subObject: string;
  @Input() set colList(list) {
    //
  }

  // Események.
  @Output() add: EventEmitter<any> = new EventEmitter();
  @Output() remove: EventEmitter<any> = new EventEmitter();
  @Output() update: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  // Metódusok.
  getModel(row, key): any {
    return this.subObject ? row[this.subObject][key] : row[key];
  }

  setModel($event, row, key): void {
    if (this.subObject) {
      row[this.subObject][key] = $event;
    } else {
      row[key] = $event;
    }
  }

  getOptionValue(option): any {
    return option.label ? option.value : option;
  }

  getOptionLabel(option): string {
    return option.label ? option.label : option;
  }

  addRow(): void {
    this.add.emit(this.newRow);
    this.newRow = {};
  }

  updateRow(row): void {
    this.update.emit(row);
  }

  deleteRow(row): void {
    this.remove.emit(row);
  }

}
