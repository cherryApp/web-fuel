import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { zip } from 'rxjs/observable/zip';
import { DriverService } from '../../service/driver.service';
import { VehicleService } from '../../service/vehicle.service';
import { FuelingService } from '../../service/fueling.service';
import { of } from 'rxjs/observable/of';
import { Driver } from '../../model/driver';
import { Vehicle } from '../../model/vehicle';
import { Fueling } from '../../model/fueling';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { ChartDataService } from '../../service/chart-data.service';

@Component({
  selector: 'app-stat',
  templateUrl: './stat.component.html',
  styleUrls: ['./stat.component.css']
})
export class StatComponent implements OnInit, OnDestroy {

  @ViewChild('cchart') myChart;

  allData: any;

  pieChartData: any = {};

  drivers: Array<{key: string, driver: Driver}>;
  fuelings: Array<{key: string, fueling: Fueling}>;
  vehicles: Array<{key: string, vehicle: Vehicle}>;

  chartShow: number = 0;
  zipSubscription: Subscription;

  constructor(
    private cService: ChartDataService
  ) {
    this.allData = this.cService.cachedData;
    this.createChartData();
  }

  ngOnInit() {
    this.zipSubscription = this.cService.dataSubject.subscribe(
      zipData => {
        this.allData = zipData;
        this.createChartData();
      }
    );
  }

  ngOnDestroy() {
    this.zipSubscription.unsubscribe();
  }

  createChartData(): void {
    if (!this.allData) return;

    let chartData = {
      chartType: 'PieChart',
      dataTable: this.getConsumptionPerDriver(),
      options: {
        'title': 'Tankolás',
        'is3D': true,
        'legend': 'bottom',
        'width': 800,
        'height': 600
      }
    };
    this.pieChartData = chartData;
  }

  getConsumptionPerDriver(): Array<any> {
    let compared: Array<any> = [
      ['Names', 'Fuel Consumption']
    ];
    this.allData.drivers.forEach(item => {
      console.log( this.getFueling(item.key) );
      compared.push(
        [item.driver.name, this.getFueling(item.key)]
      );
    });
    return compared;
  }

  getFueling(driverKey): any {
    let fueling: any = 0;
    this.allData.fuelings.forEach(item => {
      if (item.fueling.driverId == driverKey) {
        fueling += item.fueling.amount;
      }
    });
    return parseInt(fueling);
  }

}
