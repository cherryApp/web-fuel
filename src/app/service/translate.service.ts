import { Injectable } from "@angular/core";

/**
 * A fordításokat tartalmazó osztály.
 */
@Injectable()
export class TranslateService {
  constructor() {}

  /**
   * Magyar fordítás kulcs - érték párjai.
   */
  static huHU: {} = {
    lp: "rendszám",
    manufacturer: "gyártó",
    type: "típus",
    consumption: "fogyasztás",
    fuelType: "üzemanyag",
    year: "gyártva",
    add: "új",
    diesel: "dízel",
    gasoline: "benzin",
    hybrid: "hibrid",
    electric: "elektromos",
    update: "frissít",
    delete: "töröl",
    driverId: "vezető",
    vehicleLp: "rendszám",
    time: "időpont",
    amount: "mennyiség",
    name: "név",
    email: "email",
    phone: "telefon",
    birthDate: "szül.",
    address: "cím",
    vehicleId: "rendszám"
  };
}
