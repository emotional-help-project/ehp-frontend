import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, catchError, throwError, tap } from 'rxjs';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { MessagesService } from 'src/app/shared/services/messages.service';
import { environment } from 'src/environment/environment';
import { LoginService } from '../../login/services/login.service';
import { TestListItem } from '../models/test-list-item.interface';
import { Test } from '../models/test.interface';

@Injectable({
  providedIn: 'root'
})
export class TestsService {
  private testListSubject = new BehaviorSubject<TestListItem[]>([]);
  private testSubject = new BehaviorSubject({});

  tests$: Observable<TestListItem[]> = this.testListSubject.asObservable();
  test$: Observable<any> = this.testSubject.asObservable();
  userId?: string;

  public test: Test = {
    totalNumberOfTestQuestions: 2,
    items: [
        {
            questionId: 1,
            allowsMultipleAnswers: false,
            questionText: "Do you suffer from extreme mood changes (e.g. going from extremely \"happy\" to extremely \"sad\")?",
            answers: [
                {
                    answerId: 1,
                    answerText: "Yes",
                    checked: false
                },
                {
                    answerId: 2,
                    answerText: "Sometimes",
                    checked: false
                },
                {
                    answerId: 3,
                    answerText: "No",
                    checked: false
                }
            ]
        },     
        {
          questionId: 2,
          allowsMultipleAnswers: true,
          questionText: "Has anyone in your family ever been diagnosed with Bipolar Disorder?",
          answers: [
              {
                  answerId: 4,
                  answerText: "Yes",
                  checked: false
              },
              {
                  answerId: 5,
                  answerText: "Sometimes",
                  checked: false
              },
              {
                  answerId: 6,
                  answerText: "No",
                  checked: false
              }
          ]
      }
  ]
}

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
      tap(tests => this.testListSubject.next(tests))
    );
    this.loader.showLoaderUntilCompleted(loadTests$).subscribe();
  }

  finishTest() {
    console.log();  
  }
}
