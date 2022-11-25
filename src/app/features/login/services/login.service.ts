import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError, filter } from 'rxjs';
import { catchError, map, shareReplay, tap } from 'rxjs/operators';

import { User } from 'src/app/shared/models/user';
import { MessagesService } from 'src/app/shared/services/messages.service';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})

export class LoginService {
  private subject = new BehaviorSubject<User|null>(null);

  user$: Observable<User|null> = this.subject
    .asObservable()
    .pipe(filter(user => !!user));
    
  isLoggedIn$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>;
  
  constructor(private messages: MessagesService, private http: HttpClient) {
    this.isLoggedIn$ = this.user$.pipe(map(token => !!token));
    this.isLoggedOut$ = this.isLoggedIn$.pipe(
    map(loggedIn => !loggedIn)
  );
    const token = localStorage.getItem('token');
    if (token) {
      this.subject.next(JSON.parse(token));
    }
  }

  login(data: User) {
    const url = environment.apiUrl + '/account/signup';
    return this.http.post<any>(url, data).pipe(
      tap(res => {
        console.log('kkk');
        
        const { token } = res;
        localStorage.setItem('token', JSON.stringify(token));
      }),
      catchError(err => {
        this.messages.showErrors(err);
        return throwError(err);
      }),
      shareReplay()
    );
  }

  logout() {
    this.subject.next(null);
    localStorage.removeItem('token');
  }

  getToken() {
    const token = localStorage.getItem('token');
    return token;
  }
}