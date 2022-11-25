import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {filter} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class MessagesService {

    private errorSubject = new BehaviorSubject<string[]>([]);
    private successSubject = new BehaviorSubject<string[]>([]);

    errors$: Observable<string[]> = this.errorSubject.asObservable()
        .pipe(
            filter(messages => messages && messages.length > 0)
        );

    success$: Observable<string[]> = this.successSubject.asObservable()
    .pipe(
        filter(messages => messages && messages.length > 0)
    );

    showErrors(...errors: string[]) {
        this.errorSubject.next(errors);
    }

    showSuccess(...success: string[]) {
        this.successSubject.next(success);
    }
}