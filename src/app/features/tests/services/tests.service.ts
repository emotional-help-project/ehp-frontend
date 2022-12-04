import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  map,
  catchError,
  throwError,
  tap,
} from 'rxjs';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { MessagesService } from 'src/app/shared/services/messages.service';
import { environment } from 'src/environment/environment';
import { LoginService } from '../../login/services/login.service';
import { TestListItem } from '../models/test-list-item.interface';
import { Test } from '../models/test.interface';

@Injectable({
  providedIn: 'root',
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
        questionText:
          'Do you suffer from extreme mood changes (e.g. going from extremely "happy" to extremely "sad")?',
        answers: [
          {
            answerId: 17,
            answerText: 'Yes',
            checked: false,
          },
          {
            answerId: 2,
            answerText: 'Sometimes',
            checked: false,
          },
          {
            answerId: 3,
            answerText: 'No',
            checked: false,
          },
        ],
      },
      {
        questionId: 4,
        allowsMultipleAnswers: true,
        questionText:
          'Has anyone in your family ever been diagnosed with Bipolar Disorder?',
        answers: [
          {
            answerId: 41,
            answerText: 'Yes',
            checked: false,
          },
          {
            answerId: 5,
            answerText: 'Sometimes',
            checked: false,
          },
          {
            answerId: 6,
            answerText: 'No',
            checked: false,
          },
        ],
      },
      {
        questionId: 7,
        allowsMultipleAnswers: false,
        questionText:
          'Do you suffer from extreme mood changes (e.g. going from extremely "happy" to extremely "sad")?',
        answers: [
          {
            answerId: 8,
            answerText: 'Yes',
            checked: false,
          },
          {
            answerId: 9,
            answerText: 'Sometimes',
            checked: false,
          },
          {
            answerId: 10,
            answerText: 'No',
            checked: false,
          },
        ],
      },
      {
        questionId: 11,
        allowsMultipleAnswers: true,
        questionText:
          'Has anyone in your family ever been diagnosed with Bipolar Disorder?',
        answers: [
          {
            answerId: 12,
            answerText: 'Yes',
            checked: false,
          },
          {
            answerId: 13,
            answerText: 'Sometimes',
            checked: false,
          },
          {
            answerId: 14,
            answerText: 'No',
            checked: false,
          },
        ],
      },
    ],
  };

  public testList: TestListItem[] = [
    { 
      id: 125,
      title: 'Get to know yourself',
      description: 'With this personality test, you will find out what personality type you are',
      imgUrl: "/assets/images/test-1.jpeg",
      testType: {
        id: 1254,
        title: 'Health',
      }
    },
    { 
      id: 128,
      title: 'Get to know yourself',
      description: 'With this personality test, you will find out what personality type you are',
      imgUrl: "/assets/images/test-2.jpeg",
      testType: {
        id: 1251,
        title: 'Health',
      }
    },
    { 
      id: 129,
      title: 'Get to know yourself',
      description: 'With this personality test, you will find out what personality type you are',
      imgUrl: "/assets/images/test-3.jpeg",
      testType: {
        id: 1250,
        title: 'Health',
      }
    },
  ];

  constructor(
    private loader: LoadingService,
    private messages: MessagesService,
    private http: HttpClient,
    private user: LoginService
  ) {
    this.userId = this.user.getParsedToken()?.userId;

    if (localStorage.getItem('token')) {
      this.loadAllTests();
    }
  }

  public loadAllTests() {
    const url =
      environment.apiUrl + `/tests/user/${this.userId}?skip=0&take=10`;
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

  finishTest(data: any, testId: string) {
    console.log(data);
    
    const questionAnswerUserRequests = []
    for (const [key, value] of Object.entries(data)) {
      let answer;
      if (typeof(value) !== 'boolean') {
        answer = {questionId: `${key}`, answerIds: [`${value}`]}
        questionAnswerUserRequests.push(answer);
      } 
      if (value === true) {
        const el = this.test.items.find(item => item.answers.find(ans => ans.answerId.toString() === key))
        if (el) {
          const multi = questionAnswerUserRequests.find(q => q.questionId === el.questionId);
         
        if (multi) {
          questionAnswerUserRequests.find(q => q.questionId === el.questionId)?.answerIds?.push(key);  
        } else {
          answer = {questionId: el?.questionId, answerIds: [key]}
          questionAnswerUserRequests.push(answer);
          }
        }
      }  
    }
    const answers = {
      userId: this.userId,
      testId: testId,
      questionAnswerUserRequests: questionAnswerUserRequests
    }
    console.log(answers);
    this.passAnswers(answers)
  }

  passAnswers(data: any) {
    const url =
      environment.apiUrl + `/tests/test/session/1/finalize`;
      return this.http.post(url, data).pipe(
      map(res => res)
    );
  }
}
