import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, tap, throwError } from 'rxjs';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { MessagesService } from 'src/app/shared/services/messages.service';
import { environment } from 'src/environment/environment';
import { LoginService } from '../../login/services/login.service';
import { Statistics } from '../models/statistics.interface';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  private subject = new BehaviorSubject<Statistics[]>([]);

  statistics$: Observable<Statistics[]> = this.subject.asObservable();

  statistics = [
    {
        testDateTime: "2022-11-29T17:08:12.510998",
        result: 5
    },
    {
        testDateTime: "2022-11-30T20:52:26.035909",
        result: 9
    },
    {
        testDateTime: "2022-11-30T21:12:20.382465",
        result: 6
    },
    {
        testDateTime: "2022-12-01T21:40:48.64253",
        result: 5
    },
    {
      testDateTime: "2022-12-01T21:40:48.64253",
      result: 7
    },
    {
      testDateTime: "2022-12-01T21:40:48.64253",
      result: 8
    }
  ]

  hisrory = [
    {
        testTitle: "Depression test",
        testTypeTitle: "Health",
        dateTime: "2022-11-29T17:08:12.510998",
        result: 5,
        adviceDescription: "According to your responses, you seem to show some symptoms of Bipolar Depression.",
        links: [
            {
                id: 1,
                title: "Depression Program",
                link: "https://thiswayup.org.au/programs/depression-program/"
            },
            {
                id: 2,
                title: "Overcoming depression: How psychologists help with depressive disorders",
                link: "https://www.apa.org/topics/depression/overcoming"
            }
        ]
    },
    {
        testTitle: "Depression test",
        testTypeTitle: "Health",
        dateTime: "2022-11-30T20:52:26.035909",
        result: 9,
        adviceDescription: "According to your responses, you seem to show some symptoms of Bipolar Depression.",
        links: [
            {
                id: 1,
                title: "Depression Program",
                link: "https://thiswayup.org.au/programs/depression-program/"
            },
            {
                id: 2,
                title: "Overcoming depression: How psychologists help with depressive disorders",
                link: "https://www.apa.org/topics/depression/overcoming"
            }
        ]
    },
    {
        testTitle: "Depression test",
        testTypeTitle: "Health",
        dateTime: "2022-11-30T21:12:20.382465",
        result: 3,
        adviceDescription: "According to your responses, you seem to show some symptoms of Bipolar Depression.",
        links: [
            {
                id: 1,
                title: "Depression Program",
                link: "https://thiswayup.org.au/programs/depression-program/"
            },
            {
                id: 2,
                title: "Overcoming depression: How psychologists help with depressive disorders",
                link: "https://www.apa.org/topics/depression/overcoming"
            }
        ]
    },
    {
        testTitle: "Depression test",
        testTypeTitle: "Health",
        dateTime: "2022-12-01T21:40:48.64253",
        result: 5,
        adviceDescription: "According to your responses, you seem to show some symptoms of Bipolar Depression.",
        links: [
            {
                id: 1,
                title: "Depression Program",
                link: "https://thiswayup.org.au/programs/depression-program/"
            },
            {
                id: 2,
                title: "Overcoming depression: How psychologists help with depressive disorders",
                link: "https://www.apa.org/topics/depression/overcoming"
            }
        ]
    }
]
  userId: string | undefined;

  constructor(
    private loader: LoadingService,
    private messages: MessagesService,
    private http: HttpClient,
    private login: LoginService, 

  ) { 
    if (this.login.getToken()) {
      this.userId = this.login.getParsedToken()?.userId;
    }
  }

  loadStatistics() {
    const url = environment.apiUrl + `/user/profile/${this.userId}`;
    const loadStatistics$ =  this.http.get<any>(url).pipe(
      map(res => res.testResultStatistics),
      catchError(err => {
        const message = 'Could not load statistics';
        this.messages.showErrors(message);
        console.log(message, err);
        return throwError(err);
      }),
      tap(results => this.subject.next(results))
    );
    this.loader.showLoaderUntilCompleted(loadStatistics$).subscribe();
  }

  loadStatisticsOfOneTest() {
    const url = environment.apiUrl + `/user/profile/${this.userId}/map/1`;
    const loadStatistics$ =  this.http.get<any>(url).pipe(
      map(res => res.testResultStatistics),
      catchError(err => {
        const message = 'Could not load statistics';
        this.messages.showErrors(message);
        console.log(message, err);
        return throwError(err);
      }),
      tap(results => this.subject.next(results))
    );
    this.loader.showLoaderUntilCompleted(loadStatistics$).subscribe();
  }

}
