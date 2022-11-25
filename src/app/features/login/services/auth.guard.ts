import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { map, Observable } from 'rxjs';

import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  isLoggedIn$: Observable<boolean>;

  constructor( 
    private login: LoginService,
    private router: Router
     ) {
      this.isLoggedIn$ = this.login.isLoggedIn$.pipe(map(res => res));
     }
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    
    if (this.isLoggedIn$)  {
      return true;
    } else {
      this.login.logout();
      this.router.navigate(['/']);
      return false;
    }
  }
  
}