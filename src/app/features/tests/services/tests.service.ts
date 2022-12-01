import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, catchError, throwError, tap } from 'rxjs';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { MessagesService } from 'src/app/shared/services/messages.service';
import { environment } from 'src/environment/environment';
import { LoginService } from '../../login/services/login.service';
import { Test } from '../models/test';

@Injectable({
  providedIn: 'root'
})
export class TestsService {
  private subject = new BehaviorSubject<Test[]>([]);

  tests$: Observable<Test[]> = this.subject.asObservable();
  userId?: string;

  constructor(
    private loader: LoadingService,
    private messages: MessagesService,
    private http: HttpClient,
    private user: LoginService,
  ) {
    this.user.user$.pipe(map(user => this.userId = user?.userId));

    if (localStorage.getItem('token')) {
      this.loadAllTests();
    }
  }

  public loadAllTests() {
    const url = environment.apiUrl + `/tests/user/${this.userId}?skip=0&take=10`;
    const loadTests$ = this.http.get<any>(url).pipe(
      map(res => res.tests.content),
      catchError(err => {
        const message = 'Could not load tests';
        this.messages.showErrors(message);
        console.log(message, err);
        return throwError(err);
      }),
      tap(tests => this.subject.next(tests))
    );
    this.loader.showLoaderUntilCompleted(loadTests$).subscribe();
  }
}
