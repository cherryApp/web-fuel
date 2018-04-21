import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConfigService } from '../service/config.service';
import { AuthService } from '../service/auth.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit, OnDestroy {
  myConfig: any;
  authSubscribe: Subscription;
  user: any;
  collapsed: boolean = true;
  constructor(
    config: ConfigService,
    private authService: AuthService
  ) {
    this.myConfig = config;
  }

  ngOnInit() {
    this.authSubscribe = this.authService.user.subscribe(
      user => this.user = user,
      err => console.error(err)
    );
  }

  ngOnDestroy() {
    this.authSubscribe.unsubscribe();
  }

  onSignOut(): void {
    this.authService.signOut();
  }

  toggleNav(): void {
    this.collapsed = !this.collapsed;
  }

}
