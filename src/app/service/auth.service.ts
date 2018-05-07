import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

/**
 * Felhaszálók azonosítását végző szolgáltatás.
 */
@Injectable()
export class AuthService {

  /**
   * Az aktuálisan belépett felhasználó.
   */
  user: Observable<firebase.User>;

  /**
   *
   * @param _firebaseAuth a firebase authentikációs szolgáltatása.
   * @param router az átirányításokat végző router szolgáltatás.
   */
  constructor(
    private _firebaseAuth: AngularFireAuth,
    private router: Router
  ) {
    this.user = _firebaseAuth.authState;
  }

  /**
   * Belépteti az adott felhasználót, email + jelszó alapú azonosítással.
   * @param email a felhasználó email címe.
   * @param password a felhasználó jelszava.
   */
  signInRegular(email, password) {
    const credential = firebase.auth.EmailAuthProvider.credential( email, password );
    return this._firebaseAuth.auth.signInWithEmailAndPassword(email, password)
  }

  /**
   * Kiléptetés.
   */
  signOut(): void {
    this._firebaseAuth.auth.signOut();
  }
}
