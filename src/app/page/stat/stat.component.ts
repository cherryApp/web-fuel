import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { merge } from 'rxjs/observable/merge';
import { concat } from 'rxjs/observable/concat';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { zip } from 'rxjs/observable/zip';
import 'rxjs/add/observable/from';
import { ForkJoinObservable } from 'rxjs/observable/ForkJoinObservable';
import { DriverService } from '../../service/driver.service';
import { VehicleService } from '../../service/vehicle.service';
import { FuelingService } from '../../service/fueling.service';
import { of } from 'rxjs/observable/of';
import { Driver } from '../../model/driver';
import { Vehicle } from '../../model/vehicle';
import { Fueling } from '../../model/fueling';

@Component({
  selector: 'app-stat',
  templateUrl: './stat.component.html',
  styleUrls: ['./stat.component.css']
})
export class StatComponent implements OnInit {

  @ViewChild('cchart') cchart;

  allData: any[] = [];

  pieChartData =  {
    chartType: 'PieChart',
    dataTable: [
      ['Task', 'Hours per Day'],
      ['Work',     11],
      ['Eat',      2],
      ['Commute',  2],
      ['Watch TV', 2],
      ['Sleep',    7]
    ],
    options: {'title': 'Tasks'},
  };

  constructor(
    private dService: DriverService,
    private vService: VehicleService,
    private fService: FuelingService
  ) {

    console.log(this.cchart);

    setTimeout(() => {
      this.pieChartData.dataTable[2][1] = 10;
      this.cchart.redraw();
      let googleChartWrapper = this.cchart.wrapper;
      console.log(googleChartWrapper);

    }, 3000);

  }

  ngOnInit() {
    zip(
      this.vService.all,
      this.dService.all,
      this.fService.all
    ).subscribe(
      zipData => this.allData = zipData
    );

  }

}
