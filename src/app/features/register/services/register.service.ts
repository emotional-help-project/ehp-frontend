import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, shareReplay, tap } from 'rxjs/operators';

import { User } from 'src/app/shared/models/user';
import { MessagesService } from 'src/app/shared/services/messages.service';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
   
  constructor(public messages: MessagesService, private http: HttpClient) { }

  register(data: User) {
    const url = environment.apiUrl + '/account/signup';
    return this.http.post(url, data).pipe(
      catchError(err => {
        this.messages.showErrors(err);
        return throwError(err);
      }),
      tap(() => {
        const message = 'You registered successfully. Please log in'
        this.messages.showSuccess(message);
      }),
      shareReplay()
    );
  }
}