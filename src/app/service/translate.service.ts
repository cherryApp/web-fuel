import { Injectable } from "@angular/core";

@Injectable()
export class TranslateService {
  constructor() {}

  static huHU: {} = {
    lp: "rendszám",
    manufacturer: "gyártó",
    type: "típus",
    consumption: "fogyasztás",
    fuelType: "üzemanyag",
    year: "gyártva",
    add: "új"
  };
}
