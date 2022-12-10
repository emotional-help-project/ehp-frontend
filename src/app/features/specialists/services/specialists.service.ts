import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, tap, throwError } from 'rxjs';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { MessagesService } from 'src/app/shared/services/messages.service';
import { environment } from 'src/environment/environment';
import { Specialist } from '../models/specialist';

@Injectable({
  providedIn: 'root'
})
export class SpecialistsService {

  private subject = new BehaviorSubject<Specialist[] | null>(null);
  specialists$: Observable<Specialist[] | null> = this.subject.asObservable();

  constructor(
    private http: HttpClient,
    private messages: MessagesService,
    private loader: LoadingService,
    ) {
      this.loader.showLoaderUntilCompleted(this.loadPsychologists()).subscribe();
    }

  loadPsychologists() {
    const url = environment.apiUrl + '/psychologists'
    return this.http.get<Specialist[]>(url).pipe(
      map(res => res),
      catchError(err => {
        const message = 'Could not load psychologists';
        this.messages.showErrors(message);
        console.log(message, err);
        return throwError(err);
      }),
      tap(psychologists => this.subject.next(psychologists))
    );
  }
}
