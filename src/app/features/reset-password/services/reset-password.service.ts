import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, shareReplay, tap, throwError } from 'rxjs';
import { MessagesService } from 'src/app/shared/services/messages.service';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  constructor(
    private http: HttpClient,
    private messages: MessagesService,
    private router: Router
  ) { }

  resetPassword(password: string, email: string) {
    const url = environment.apiUrl + `/forgot/reset?email=${email}&password=${password}`;
    return this.http.post(url, {}).pipe(
      catchError(err => {
        this.messages.showErrors('Something went wrong');
        return throwError(err);
      }),
      tap(() => {
        const message = `Your password was updated successfuly. Please sign in`;
        this.messages.showSuccess(message);
        this.router.navigate(['/login']);
      }),
      shareReplay()
    );
  }
}
