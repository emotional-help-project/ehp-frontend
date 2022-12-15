import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, map, Observable, tap, throwError } from 'rxjs';
import { User } from 'src/app/shared/models/user';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { MessagesService } from 'src/app/shared/services/messages.service';
import { environment } from 'src/environment/environment';
import { LoginService } from '../../login/services/login.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
   
  userId: string | undefined;
  defaultUser = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    gender: '',
    age: 0,
    role: ''
  }

  public subject = new BehaviorSubject<User>(this.defaultUser);
  user$: Observable<User> = this.subject.asObservable();

  constructor(
    private login: LoginService, 
    private http: HttpClient,
    private messages: MessagesService,
    private loader: LoadingService,
    private router: Router
    ) {
    
    if (this.login.getToken()) {
      this.userId = this.login.getUserId();
      this.loadCurrentUser();       
    }
   }

   loadCurrentUser() {
    const url = environment.apiUrl + `/users/${this.userId}`
    const loadUser$ = this.http.get(url).pipe(
      map(res => res),
      catchError(err => {
        const message = 'Could not load user data';
        this.messages.showErrors(message);
        console.log(message, err);
        return throwError(err);
      }),
      tap(user => this.subject.next(user))
    );
    return this.loader.showLoaderUntilCompleted(loadUser$).subscribe();
   }

   updateProfile(data: any, id: number | undefined) {
    const user = this.subject.getValue();
    const loginData = this.login.subject.getValue();
    let storage: any;
    const updatedUser = {
      ...user,
      ...data,
    }
    const {email} = user;
    const reqBody = {
      email,
      id,
      ...data      
    }
  
    const url = environment.apiUrl + '/user/profile/update';
    return this.http.put(url, reqBody).pipe(
      map(res => res),
      catchError(err => {
        const message = 'Could not update profile';
        this.messages.showErrors(message);
        console.log(message, err);
        return throwError(err);
      }),
      tap(() => {
        this.subject.next(updatedUser);
        if (data.firstName) {
          const user = localStorage.getItem('user');
          if (user) {
            storage = {...JSON.parse(user), firstName: data.firstName};
          }  
          localStorage.setItem('user', JSON.stringify(storage));
        }
        return this.login.subject.next({...loginData, ...storage});
      })
    );
   }

   updatePassword(password: any, id: number | undefined) {
    const url = environment.apiUrl + `/user/profile/update/password`;
    const data = {
      userId: id,
      ...password
    }
    console.log(data);
    
    return this.http.put(url, data).pipe(
      map(res => res),
      catchError(err => {
        const message = 'Could not update password';
        this.messages.showErrors(message);
        console.log(message, err);
        return throwError(err);
      }),
      tap(() => this.messages.showSuccess('Your password was updated successfuly'))
    );
   }

   deleteAccount(id: number) {
    const url = environment.apiUrl + `/users/${id}`;
    return this.http.delete(url).pipe(
      map(res => res),
      catchError(err => {
        const message = 'Could not delete account';
        this.messages.showErrors(message);
        console.log(message, err);
        return throwError(err);
      }),
      tap(() => {
        this.messages.showSuccess('Your account was deleted successfuly')
        this.login.logout();
        this.router.navigate(['/']);
        this.subject.next(this.defaultUser);
      })
    );
   }
}
