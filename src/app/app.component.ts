import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { ConfigService } from './service/config.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from './service/auth.service';
import { merge } from 'rxjs/observable/merge';
import { of } from 'rxjs/observable/of';
import { fromEvent } from 'rxjs/observable/fromEvent';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  user: any = false;
  authSubscribe: Subscription;
  onlineSubscribe: Subscription;
  onlineStatus: boolean = true;

  constructor(
    private authService: AuthService,
    private router: Router,
    private config: ConfigService
  ) {

  }

  ngOnInit() {
    this.authSubscribe = this.authService.user.subscribe(
      user => {
        this.user = user;
        if (!user) {
          this.router.navigate(["/login"]);
        }
      },
      error => console.error(error)
    );

    this.onlineSubscribe = this.config.onlineStatus.subscribe(
      status => {
        this.onlineStatus = status;
      }
    );
  }

  ngOnDestroy() {
    this.authSubscribe.unsubscribe();
    this.onlineSubscribe.unsubscribe();
  }

}
