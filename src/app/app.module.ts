import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireModule } from 'angularfire2';


import { ServiceWorkerModule } from '@angular/service-worker';
import { AppComponent } from './app.component';

import { environment } from '../environments/environment';
import { NavComponent } from './nav/nav.component';
import { ConfigService } from './service/config.service';
import { HomeComponent } from './page/home/home.component';
import { VehicleComponent } from './page/vehicle/vehicle.component';
import { FuelingComponent } from './page/fueling/fueling.component';
import { StatComponent } from './page/stat/stat.component';
import { SettingsComponent } from './page/settings/settings.component';
import { VehicleService } from './service/vehicle.service';

const cService: ConfigService = new ConfigService();

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    VehicleComponent,
    FuelingComponent,
    StatComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(cService.routing),
    AngularFireModule.initializeApp(cService.firebaseSettings),
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    ConfigService,
    VehicleService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
