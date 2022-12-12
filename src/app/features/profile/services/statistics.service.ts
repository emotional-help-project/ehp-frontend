import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  tap,
  throwError,
} from 'rxjs';

import { LoadingService } from 'src/app/shared/services/loading.service';
import { MessagesService } from 'src/app/shared/services/messages.service';
import { environment } from 'src/environment/environment';
import { LoginService } from '../../login/services/login.service';
import { PassedTest } from '../models/passedTest.interface';
import { Statistics } from '../models/statistics.interface';

@Injectable({
  providedIn: 'root',
})
export class StatisticsService {
  private emotionSubject = new BehaviorSubject<Statistics[]>([]);
  private historySubject = new BehaviorSubject<History[]>([]);
  private passedTestSubject = new BehaviorSubject<PassedTest[]>([]);

  statistics$: Observable<Statistics[]> = this.emotionSubject.asObservable();
  history$: Observable<History[]> = this.historySubject.asObservable();
  passedTestList$: Observable<PassedTest[]> =
    this.passedTestSubject.asObservable();

  userId: string | undefined;

  constructor(
    private loader: LoadingService,
    private messages: MessagesService,
    private http: HttpClient,
    private login: LoginService
  ) {
    if (this.login.getToken()) {
      this.userId = this.login.getParsedToken()?.userId;
    }
  }

  loadStatistics() {
    const url = environment.apiUrl + `/user/profile/${this.userId}`;
    const loadStatistics$ = this.http.get<any>(url).pipe(
      map(res => res.testResultStatistics),
      catchError(err => {
        const message = 'Could not load statistics';
        this.messages.showErrors(message);
        console.log(message, err);
        return throwError(err);
      }),
      tap(results => this.emotionSubject.next(results))
    );
    this.loader.showLoaderUntilCompleted(loadStatistics$).subscribe();
  }

  loadPassedTestList() {
    const url =
      environment.apiUrl + `/user/profile/tests?userId=${this.userId}`;
    return this.http.get<any>(url).pipe(
      map(res => res),
      catchError(err => {
        const message = 'Could not load test list';
        this.messages.showErrors(message);
        console.log(message, err);
        return throwError(err);
      }),
      tap(results => this.passedTestSubject.next(results))
    );
  }

  loadOneTestStatistics(id: string) {
    const url = environment.apiUrl + `/user/profile/${this.userId}/map/${id}`;
    const data: any = [];
    const labels: any = [];
    let label: string;
    let eMap = {};

    return this.http.get<any>(url).pipe(
      map(res => {
        label = res.testTitle;
        res.testResultStatistics.forEach((el: any) => {
          data.push(el.result);
          labels.push(
            el.testDateTime.slice(0, 10).split('-').reverse().join('.')
          );
          eMap = {
            ...{
              labels: labels,
              datasets: [
                {
                  data: data,
                  label: label,
                  fill: true,
                  tension: 0.5,
                  borderColor: '#4bb0a9',
                  backgroundColor: 'rgba(217, 190, 147, 0.5)',
                },
              ],
            },
          };
        });
        return eMap;
      }),
      catchError(err => {
        const message = 'Could not load emotional map';
        this.messages.showErrors(message);
        console.log(message, err);
        return throwError(err);
      })
    );
  }

  loadHistory() {
    const url = environment.apiUrl + `/user/profile/${this.userId}/statistics`;
    return this.http.get<any>(url).pipe(
      map(res => res.emotionStatistics),
      catchError(err => {
        const message = 'Could not load statistics';
        this.messages.showErrors(message);
        console.log(message, err);
        return throwError(err);
      }),
      tap(results => this.historySubject.next(results))
    );
  }
}
