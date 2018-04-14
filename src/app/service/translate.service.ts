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
