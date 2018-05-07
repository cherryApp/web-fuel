import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { ConfigService } from './service/config.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from './service/auth.service';
import { merge } from 'rxjs/observable/merge';
import { of } from 'rxjs/observable/of';
import { fromEvent } from 'rxjs/observable/fromEvent';

/**
 * Az alkalmazás gyökér - komponense.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  /**
   * Aktuális felhasználó.
   */
  user: any = false;

  /**
   * Feliratkozás az authentikációs állapot módosulásaira.
   */
  authSubscribe: Subscription;

  /**
   * Feliratkozás az online állapot módosulásaira.
   */
  onlineSubscribe: Subscription;

  /**
   * Az online státusz tárolása.
   */
  onlineStatus: boolean = true;

  /**
   *
   * @param authService authentikációs szolgáltatás.
   * @param router az útválasztó szolgáltatás.
   * @param config a konfigurációs szolgáltatás.
   */
  constructor(
    private authService: AuthService,
    private router: Router,
    private config: ConfigService
  ) {

  }

  /**
   * Inicializálás során feliratkozik az bejelentkezett státusz módosulásaira.
   * Figyeli az online státusz módosulásait.
   */
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

  /**
   * Megszűnés előtt törli a feliratkozásokat.
   */
  ngOnDestroy() {
    this.authSubscribe.unsubscribe();
    this.onlineSubscribe.unsubscribe();
  }

}
