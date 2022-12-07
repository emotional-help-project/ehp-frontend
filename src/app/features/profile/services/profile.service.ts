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
      this.userId = this.login.getParsedToken()?.userId;
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
    this.loader.showLoaderUntilCompleted(loadUser$).subscribe();
   }

   updateProfile(data: any) {
    console.log(data);
    const user = this.subject.getValue();
    let newData;
    if (data.newPassword) {
      newData = {}
    } else {
      newData = data;
    }
    const updatedUser = {
      ...user,
      ...newData
    }
    const url = environment.apiUrl + '/user/profile/update';
    return this.http.put(url, data).pipe(
      map(res => res),
      catchError(err => {
        const message = 'Could not update profile';
        this.messages.showErrors(message);
        console.log(message, err);
        return throwError(err);
      }),
      tap(() => this.subject.next(updatedUser))
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