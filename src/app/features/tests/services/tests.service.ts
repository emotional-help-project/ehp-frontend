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
import { Question } from '../models/question.models';
import { TestList, TestListItem, TestType} from '../models/test-list-item.interface';
import { TestResult } from '../models/test-result.interface';
import { Test } from '../models/test.interface';

@Injectable({
  providedIn: 'root',
})
export class TestsService {
  private testListSubject = new BehaviorSubject<TestListItem[]>([]);
  private testSubject = new BehaviorSubject<Test>({ 
    testTitle: '',
    totalNumberOfTestQuestions: 0,
    items: []
  });

  tests$: Observable<TestListItem[]> = this.testListSubject.asObservable();
  test$: Observable<Test> = this.testSubject.asObservable();
  // testResult$: Observable<TestResult>;
  userId?: string;

  public test: Test = {
    testTitle: "Depression test",
    totalNumberOfTestQuestions: 4,
    items: [
      {
        questionId: 2,
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
        questionId: 5,
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
   /*  { 
      id: 125,
      title: 'Get to know yourself',
      description: 'With this personality test, you will find out what personality type you are',
      imageUrl: "/assets/images/test-1.jpeg",
      testType: {
        id: 1254,
        title: 'Health',
      }
    },
    { 
      id: 128,
      title: 'Get to know yourself',
      description: 'With this personality test, you will find out what personality type you are',
      imageUrl: "/assets/images/test-2.jpeg",
      testType: {
        id: 1251,
        title: 'Health',
      }
    },
    { 
      id: 129,
      title: 'Get to know yourself',
      description: 'With this personality test, you will find out what personality type you are',
      imageUrl: "/assets/images/test-3.jpeg",
      testType: {
        id: 1250,
        title: 'Health',
      }
    },
    { 
      id: 140,
      title: 'Get to know yourself',
      description: 'With this personality test, you will find out what personality type you are',
      imageUrl: "/assets/images/test-3.jpeg",
      testType: {
        id: 1250,
        title: 'Health',
      }
    },
    { 
      id: 150,
      title: 'Get to know yourself',
      description: 'With this personality test, you will find out what personality type you are',
      imageUrl: "/assets/images/test-3.jpeg",
      testType: {
        id: 1250,
        title: 'Health',
      }
    }, */
  ];
  public testsType: TestType[] =[];

  public testResult: TestResult = {
    adviceDescription: "According to your responses, you seem to show some symptoms of Bipolar Depression.",
    scoreFrom: 0,
    scoreTo: 70,
    userScore: 5,
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
      environment.apiUrl + '/tests';
    const loadTests$ = this.http.get<any>(url).pipe(
      map(res => res),
      catchError(err => {
        const message = 'Could not load tests';
        this.messages.showErrors(message);
        console.log(message, err);
        return throwError(err);
      }),
      tap(tests => this.testListSubject.next(tests))
    );
    return this.loader.showLoaderUntilCompleted(loadTests$).subscribe();
  }

  startTest(id: string) {
    const firstUrl = environment.apiUrl + `/tests/test/${id}/init?userId=${this.userId}`;
    return this.http.post<any>(firstUrl, {}).pipe(
      map(res => res),
      catchError(err => {
        const message = 'Could not load test';
        this.messages.showErrors(message);
        console.log(message, err);
        return throwError(err);
      })
    )
  }

  loadTestById(id: string) {
    const secondUrl = environment.apiUrl + `/tests/test/${id}/session/1?skip=0&take=100`;
    return this.http.get<Test>(secondUrl).pipe(
      map(res => res),
      catchError(err => {
        const message = 'Could not load test';
        this.messages.showErrors(message);
        console.log(message, err);
        return throwError(err);
      }),
      tap(test => this.testSubject.next(test))
    );
  }

  finishTest(data: any, testId: string) {
    const test = this.testSubject.getValue();
    const questionAnswerUserRequests: any[] = []
    for (const [key, value] of Object.entries(data)) {
      let answer;
      if (typeof(value) !== 'boolean') {
        answer = {questionId: Number(`${key}`), answerIds: [Number(`${value}`)]}
        questionAnswerUserRequests.push(answer);
      } 
      if (value === true) {
        const el = test.items.find(item => item.answers.find(ans => ans.answerId.toString() === key))
        if (el) {
          const multi = questionAnswerUserRequests.find(q => q.questionId === el.questionId);
         
        if (multi) {
          questionAnswerUserRequests.find(q => q.questionId === el.questionId)?.answerIds?.push(Number(key));  
        } else {
          answer = {questionId: el?.questionId, answerIds: [Number(key)]}
          questionAnswerUserRequests.push(answer);
          }
        }
      }  
    }
    test.items.forEach(item => {
      const notAnswered = questionAnswerUserRequests.find(ans => ans.questionId === item.questionId)
      if (notAnswered) {
        return
      } else {
        return questionAnswerUserRequests.push({questionId: item.questionId, answerIds: []})
      }
    })
    const answers = {
      userId: Number(this.userId),
      testId: Number(testId),
      questionAnswerUserRequests
    }
    console.log(answers);
    return this.passAnswers(answers);
  }

  passAnswers(data: any) {
    // const firstUrl = environment.apiUrl + `/tests/test/session/1`;
    // this.http.post(firstUrl, data);
    console.log(data);
    
    const secondUrl =
      environment.apiUrl + `/tests/test/session/1/finalize`;
      return this.http.post<TestResult>(secondUrl, data).pipe(
      map(res => res),
      catchError(err => {
        const message = 'Something went wrong. Try again later';
        this.messages.showErrors(message);
        console.log(message, err);
        return throwError(err);
      }),
    );
  }
   addQuestion(question: Question){
    const addQuestionUrl = environment.apiUrl + `/admin/test`;
    return this.http.post(addQuestionUrl, question)
  }
  addTestCard(card: TestListItem){
    const addCardUrl = environment.apiUrl + `/tests`;
    return this.http.post<any>(addCardUrl, card)
  }
/*   getTestCard(){
    const getCardUrl = environment.apiUrl + `/tests`;
    return this.http.get<TestListItem[]>(getCardUrl)
    .pipe( tap(testList => this.testList = testList))
  } */
  addTestType(testType: TestType){
    const addTestTypeUrl = environment.apiUrl + `/testTypes`;
    return this.http.post(addTestTypeUrl, testType)
  }
  getTestType(){
    const testTypeUrl = environment.apiUrl + `/testTypes`;
    return this.http.get<TestType[]>(testTypeUrl)
    .pipe( tap(testsType => this.testsType = testsType))

  }

}
