import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, shareReplay, tap, throwError } from 'rxjs';
import { TokenPayload, User } from 'src/app/shared/models/user';
import { MessagesService } from 'src/app/shared/services/messages.service';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ForgotService {

  public subject = new BehaviorSubject<User|null>(null);

  user$: Observable<User|null> = this.subject.asObservable();
  isLoggedIn$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>;
  updatedUser = {};
  
  constructor(private messages: MessagesService, private http: HttpClient) {
    
    this.isLoggedIn$ = this.user$.pipe(map(user => !!user?.token));
    this.isLoggedOut$ = this.isLoggedIn$.pipe(map(loggedIn => !loggedIn));

    const user = localStorage.getItem('user')

    if (user) {  
      this.subject.next(JSON.parse(user));
    }    

  }
  forgotService(email: string): Observable<any> {
    const url = environment.apiUrl + '/forgot';
    const params= new HttpParams().set('email',email)
    return this.http.post<any>(url,params);
  }
  resetForm(token: string, password:string): Observable<any> {
    const url = environment.apiUrl + '/forgot/reset';
    const params= new HttpParams().set('token',token).set("password",password)
    return this.http.post<any>(url,{params});
  }
  // forgot(email: string) {
  //   const url = environment.apiUrl + '/forgot';
  //   return this.http.post<Partial<User>>(url, email).pipe(
  //     tap(({ email,token }) => {
  //       if (token) {
  //         this.subject.next({ email });
  //         localStorage.setItem('token', JSON.stringify(token));
  //         localStorage.setItem('user', JSON.stringify({ token, email }));
  //       }
  //     }),
  //     catchError(err => {
  //       this.messages.showErrors(err);
  //       return throwError(err);
  //     }),
  //     shareReplay()
  //   );
  // }

  logout() {
    this.subject.next(null);
    localStorage.removeItem('user');
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
