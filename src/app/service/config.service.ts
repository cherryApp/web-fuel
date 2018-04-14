import { Injectable } from '@angular/core';
import { Routes } from '@angular/router';
import { HomeComponent } from '../page/home/home.component';
import { FuelingComponent } from '../page/fueling/fueling.component';
import { VehicleComponent } from '../page/vehicle/vehicle.component';
import { StatComponent } from '../page/stat/stat.component';
import { SettingsComponent } from '../page/settings/settings.component';

@Injectable()
export class ConfigService {
  // Az alkalmazás címsorában megjelenő szöveg.
  appTitle: string = "WebFuel";

  // Az útválasztás szabályai.
  routing: Routes = [
    {
      path: "",
      component: HomeComponent
    },
    {
      path: "fueling",
      component: FuelingComponent
    },
    {
      path: "vehicles",
      component: VehicleComponent
    },
    {
      path: "stat",
      component: StatComponent
    },
    {
      path: "settings",
      component: SettingsComponent
    },
    {
      path: "**",
      component: HomeComponent
    },
  ];

  // Kapcsolati beállítsok a távoli firebase adatbázishoz.
  firebaseSettings: any = {
    apiKey: "AIzaSyAKddTzM8ZzIIdzngqEk59pq7U-_IciQ5g",
    authDomain: "webfuel-dadff.firebaseapp.com",
    databaseURL: "https://webfuel-dadff.firebaseio.com",
    projectId: "webfuel-dadff",
    storageBucket: "webfuel-dadff.appspot.com",
    messagingSenderId: "79761320529"
  };

  // A teszteléshez használt felhasználó belépési adatai.
  testUser: {email: string, password: string} = {
    email: "info@webfuel.com",
    password: "webfuel"
  };

  constructor() { }

}
