import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';

import { LoginService } from 'src/app/features/login/services/login.service';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {

  isLoggedIn$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>;
  user$: Observable<string | undefined>;
  
  constructor(
    public login: LoginService,
    private router: Router
  ) { 
    this.isLoggedIn$ = this.login.isLoggedIn$.pipe(map(res => res));
    this.isLoggedOut$ = this.login.isLoggedOut$.pipe(map(res => res));
    this.user$ = this.login.user$.pipe(map(res => res?.firstName));
  }

  logout(event: Event) {
    event.preventDefault();
    this.login.logout();
    this.router.navigate(['/']);
  }
}
