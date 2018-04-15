import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { FormsModule } from '@angular/forms';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';


import { ServiceWorkerModule } from '@angular/service-worker';
import { AppComponent } from './app.component';

import { environment } from '../environments/environment';
import { NavComponent } from './nav/nav.component';
import { ConfigService, AppRouting, FirebaseSettings } from './service/config.service';
import { HomeComponent } from './page/home/home.component';
import { VehicleComponent } from './page/vehicle/vehicle.component';
import { FuelingComponent } from './page/fueling/fueling.component';
import { StatComponent } from './page/stat/stat.component';
import { SettingsComponent } from './page/settings/settings.component';
import { VehicleService } from './service/vehicle.service';
import { TransPipe } from './pipe/trans.pipe';
import { TableComponent } from './table/table.component';
import { FuelingService } from './service/fueling.service';
import { DriverComponent } from './page/driver/driver.component';
import { DriverService } from './service/driver.service';
import { LoginComponent } from './login/login.component';
import { AuthService } from './service/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    VehicleComponent,
    FuelingComponent,
    StatComponent,
    SettingsComponent,
    TransPipe,
    TableComponent,
    DriverComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(AppRouting),
    AngularFireModule.initializeApp(environment.FirebaseSettings),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    FormsModule,
    Ng2GoogleChartsModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    AuthService,
    ConfigService,
    VehicleService,
    FuelingService,
    DriverService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
