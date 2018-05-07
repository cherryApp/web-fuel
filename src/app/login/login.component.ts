import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

/**
 * A be és kijelentkeztetésért felelős komponens osztály.
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  /**
   * A bejelentkezéshez szükséges adatokat tároló objektum.
   */
  loginData: {email: string, password: string} = {
    email: "",
    password: ""
  };

  /**
   * @param authService az authentikációért felelős szolgálatás.
   * @param router az oldalak dinamikus betöltéséért felelős szolgáltatás.
   */
  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  /**
   * Bejelentkezés email cím és jelszó használatával.
   */
  signInWithEmail() {
    this.authService.signInRegular(this.loginData.email, this.loginData.password)
       .then( (res) => this.router.navigate(['/']) )
       .catch( (err) => console.log('error: ' + err) );
  }

}
