import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError, catchError, map, shareReplay, tap, finalize} from 'rxjs';

import { User, TokenPayload } from 'src/app/shared/models/user';
import { MessagesService } from 'src/app/shared/services/messages.service';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})

export class LoginService {
  public subject = new BehaviorSubject<User|null>(null);

  user$: Observable<User|null> = this.subject.asObservable();
  isLoggedIn$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>;
  updatedUser = {};
  
  constructor(public messages: MessagesService, private http: HttpClient) {
    
    this.isLoggedIn$ = this.user$.pipe(map(user => !!user?.token));
    this.isLoggedOut$ = this.isLoggedIn$.pipe(map(loggedIn => !loggedIn));

    const user = localStorage.getItem('user')

    if (user) {  
      this.subject.next(JSON.parse(user));
    }    

  }

  login(data: User) {
    const url = environment.apiUrl + '/account/signin';
    return this.http.post<Partial<User>>(url, data).pipe(
      catchError(err => {
        this.messages.showErrors(err);
        return throwError(err);
      }),
      tap(({ token, firstName, userId }) => {
        if (token) {
          this.subject.next({ token, firstName, userId });
          localStorage.setItem('token', JSON.stringify(token));
          localStorage.setItem('user', JSON.stringify({ token, firstName, userId }));
        }
      }),
      
      shareReplay()
    );
  }

  sendEmail(email: Partial<User>) {
    const url = environment.apiUrl + `/forgot?email=${email}`;
    return this.http.post(url, {}).pipe(
      // catchError(err => {
      //   this.messages.showErrors('Something went wrong');
      //   return throwError(err);
      // }),
      finalize(() => this.messages.showSuccess(`An email with a link to create a new password has been sent to ${email}`)),
      shareReplay()
    );
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.subject.next(null);
  }

  getToken() {
    const token = localStorage.getItem('token');
    return token;
  }

  getUserId() {
    const user = localStorage.getItem('user');
    if (user) {
      return JSON.parse(user).userId
    } else {
      return null;
    }
  }
  
  getParsedToken(){
    const token = localStorage.getItem('token');
    if(token != null) {
      const parsed: TokenPayload = JSON.parse(atob(token.split('.')[1]));

     return { token, firstName: parsed.username, userId: parsed.id, isAdmin: parsed.role.includes('ADMIN') }
     // return { token, firstName: parsed.username, userId: parsed.id, isAdmin: false }
    }
    return null;
  }
}