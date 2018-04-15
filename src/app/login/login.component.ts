import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { ConfigService } from '../service/config.service';
import * as firebase from 'firebase/app';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  auth: any;
  loginData: {email: string, password: string} = {
    email: "",
    password: ""
  };

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit() {

  }

  signInWithEmail() {
    this.authService.signInRegular(this.loginData.email, this.loginData.password)
       .then( (res) => this.router.navigate(['/']) )
       .catch( (err) => console.log('error: ' + err) );
  }

}
