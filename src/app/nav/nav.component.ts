import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../service/config.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  constructor(private config: ConfigService) {

  }

  ngOnInit() {
  }

}
