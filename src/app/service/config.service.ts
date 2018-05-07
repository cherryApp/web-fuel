import { Injectable, OnInit } from '@angular/core';
import { Routes } from '@angular/router';
import { HomeComponent } from '../page/home/home.component';
import { FuelingComponent } from '../page/fueling/fueling.component';
import { VehicleComponent } from '../page/vehicle/vehicle.component';
import { StatComponent } from '../page/stat/stat.component';
import { DriverComponent } from '../page/driver/driver.component';
import { LoginComponent } from '../login/login.component';
import { Observable } from 'rxjs/Observable';
import { merge } from 'rxjs/observable/merge';
import { of } from 'rxjs/observable/of';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { Subject } from 'rxjs/Subject';

/**
 * A configurációs beállításokat szolgáltatja.
 */
@Injectable()
export class ConfigService implements OnInit{
  /**
   * Az Observable az alkalmazás online/offline állapotát figyeli.
   */
  private online: Observable<any>;

  /**
   * Az alkalmazás online státuszát szolgáltatja.
   */
  onlineStatus: Subject<boolean> = new Subject();

  /**
   * Az alkalmazás címsorában megjelenő szöveg.
   */
  appTitle: string = "WebFuel";

  /**
   * A teszteléshez használt felhasználó belépési adatai.
   */
  testUser: {email: string, password: string} = {
    email: "info@webfuel.com",
    password: "webfuel"
  };

  constructor() {
    this.online = merge(
      of(navigator.onLine),
      fromEvent(window, 'online').map(o => o),
      fromEvent(window, 'offline').map(o => o)
    );
    this.online.subscribe(
      ev => {
        if (ev === true || ev.type === 'online') {
          this.onlineStatus.next(true);
        } else {
          this.onlineStatus.next(false);
        }
      }
    );
  }

  ngOnInit() {

  }

}

/**
 * Az útválasztás szabályai.
 */
export const AppRouting: Routes = [
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
    path: "driver",
    component: DriverComponent
  },
  {
    path: "stat",
    component: StatComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "**",
    component: HomeComponent
  },
];

/**
 * Kapcsolati beállítások a távoli firebase adatbázishoz.
 * Ezek pulblikus kulcsok, nem lehet a segítségükkel a védett adatokhoz hozzáférni,
 * csak bejelentkezés után.
 */
export const FirebaseSettings: any = {
  apiKey: "AIzaSyAKddTzM8ZzIIdzngqEk59pq7U-_IciQ5g",
  authDomain: "webfuel-dadff.firebaseapp.com",
  databaseURL: "https://webfuel-dadff.firebaseio.com",
  projectId: "webfuel-dadff",
  storageBucket: "webfuel-dadff.appspot.com",
  messagingSenderId: "79761320529"
};
