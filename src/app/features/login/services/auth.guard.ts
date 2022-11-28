import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  isLoggedIn: boolean;

  constructor( 
    public login: LoginService,
    public router: Router
     ) {
      this.isLoggedIn = this.login.getToken() ? true : false;
     }
  
  canActivate(): boolean {
    if (!this.isLoggedIn)  {
      this.login.logout();
      this.router.navigate(['login']);
      return false;
    } 
    return true;
  }
}