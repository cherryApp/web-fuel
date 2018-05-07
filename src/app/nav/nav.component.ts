import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConfigService } from '../service/config.service';
import { AuthService } from '../service/auth.service';
import { Subscription } from 'rxjs/Subscription';

/**
 * A navigációért felelős komponens.
 */
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit, OnDestroy {
  /**
   * A konfigurációs beállításokra mutató referencia.
   */
  myConfig: any;

  /**
   * Az authentikációs állapotot figyelő feliratkozás.
   */
  authSubscribe: Subscription;

  /**
   * A bejelentkezett felhasználó.
   */
  user: any;

  /**
   * A menü vizuális állapota, ha true akkor összecsukott állapotban van.
   */
  collapsed: boolean = true;

  /**
   *
   * @param config a konfigurációs szolgáltatás.
   * @param authService az authentikációs szolgáltatás.
   */
  constructor(
    config: ConfigService,
    private authService: AuthService
  ) {
    this.myConfig = config;
  }

  /**
   * Inicializáló metódus.
   * Feliratkozunk az authentikációs állapot figyelésére.
   */
  ngOnInit() {
    this.authSubscribe = this.authService.user.subscribe(
      user => this.user = user,
      err => console.error(err)
    );
  }

  /**
   * A példány törlése előtt leiratkozunk a figyelésről, hogy memóriát szabadítsunk fel.
   */
  ngOnDestroy() {
    this.authSubscribe.unsubscribe();
  }

  /**
   * Kijelentkezés.
   * Az authService signOut metódusát hívja meg.
   */
  onSignOut(): void {
    this.authService.signOut();
  }

  /**
   * Összecsukja, vagy kinyitja a mobil navigációt.
   */
  toggleNav(): void {
    this.collapsed = !this.collapsed;
  }

}
