import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, shareReplay, tap } from 'rxjs/operators';

import { User, TokenPayload } from 'src/app/shared/models/user';
import { MessagesService } from 'src/app/shared/services/messages.service';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})

export class LoginService {
  private subject = new BehaviorSubject<User|null>(null);

  user$: Observable<User|null> = this.subject.asObservable();
  isLoggedIn$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>;
  
  constructor(private messages: MessagesService, private http: HttpClient) {
    
    this.isLoggedIn$ = this.user$.pipe(map(user => !!user?.token));
    this.isLoggedOut$ = this.isLoggedIn$.pipe(map(loggedIn => !loggedIn));

    const token = this.getParsedToken();
    if (token) {
      this.subject.next(token);
    }    

  }

  login(data: User) {
    const url = environment.apiUrl + '/account/signin';
    return this.http.post<Partial<User>>(url, data).pipe(
      tap(({ token, firstName, userId }) => {

        if (token) {
          const parsed: TokenPayload = JSON.parse(atob(token.split('.')[1]));

          localStorage.setItem('token', token);
          this.subject.next({ token, firstName, userId, isAdmin: parsed.role.includes('ADMIN') });
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
  
  getParsedToken(){
    const token = localStorage.getItem('token');
    if(token != null) {
      const parsed: TokenPayload = JSON.parse(atob(token.split('.')[1]));

     // return { token, firstName: parsed.username, userId: parsed.id, isAdmin: parsed.role.includes('ADMIN') }
      return { token, firstName: parsed.username, userId: parsed.id, isAdmin: true }
    }
    return null;
  }
}