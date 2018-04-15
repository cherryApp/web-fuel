import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {
  user: Observable<firebase.User>;
  constructor(
    private _firebaseAuth: AngularFireAuth,
    private router: Router
  ) {
    this.user = _firebaseAuth.authState;
  }

  signInRegular(email, password) {
    const credential = firebase.auth.EmailAuthProvider.credential( email, password );
    return this._firebaseAuth.auth.signInWithEmailAndPassword(email, password)
  }

  signOut(): void {
    this._firebaseAuth.auth.signOut();
  }
}
