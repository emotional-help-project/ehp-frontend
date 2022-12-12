import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, Subscription } from 'rxjs';

import { AppointmentService } from 'src/app/features/appointment/services/appointment.service';
import { LoginService } from 'src/app/features/login/services/login.service';
import { ProfileService } from 'src/app/features/profile/services/profile.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnDestroy {

  isLoggedIn$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>;
  user$: Observable<string | undefined>;
  showModal = false;
  subscription: Subscription;
  
  constructor(
    public login: LoginService,
    private router: Router,
    private appointment: AppointmentService,
    private profileService: ProfileService
  ) { 
    this.isLoggedIn$ = this.login.isLoggedIn$.pipe(map(res => res));
    this.isLoggedOut$ = this.login.isLoggedOut$.pipe(map(res => res));
    this.user$ = this.login.user$.pipe(map(res => res?.firstName));
  }

  makeAppointment(data: any) {
    this.subscription = this.appointment.makeAppointment(data).subscribe(); 
  }

  logout(event: Event) {
    event.preventDefault();
    this.login.logout();
    this.router.navigate(['/']);
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
