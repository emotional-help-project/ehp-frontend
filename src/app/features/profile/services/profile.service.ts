import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

  private subject = new BehaviorSubject<User>(this.defaultUser);
  user$: Observable<User> = this.subject.asObservable();
  isLoggedIn$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>;
  

  constructor(
    private login: LoginService, 
    private http: HttpClient,
    private messages: MessagesService,
    private loader: LoadingService
    ) {
    
    if (this.login.getToken()) {
      this.userId = this.login.getParsedToken()?.userId;
      this.loadCurrentUser(); 
      this.isLoggedIn$ = this.user$.pipe(map(user => !!user?.email));
      this.isLoggedOut$ = this.isLoggedIn$.pipe(map(loggedIn => !loggedIn));
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
}
