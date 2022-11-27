import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, shareReplay, tap } from 'rxjs/operators';

import { User } from 'src/app/shared/models/user';
import { MessagesService } from 'src/app/shared/services/messages.service';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})

export class LoginService {
  private subject = new BehaviorSubject<string|null>(null);

  token$: Observable<string|null> = this.subject.asObservable();
  isLoggedIn$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>;
  
  constructor(private messages: MessagesService, private http: HttpClient) {
    
    this.isLoggedIn$ = this.token$.pipe(map(token => !!token));
    this.isLoggedOut$ = this.isLoggedIn$.pipe(map(loggedIn => !loggedIn));

    const token = this.getToken();
    if (token) {
      this.subject.next(JSON.parse(token));
    }    
  }

  login(data: User) {
    const url = environment.apiUrl + '/account/signin';
    return this.http.post<Partial<User>>(url, data).pipe(
      tap(res => {
        const { token } = res;
        localStorage.setItem('token', JSON.stringify(token));
        if (token) {
          this.subject.next(token);
        }
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