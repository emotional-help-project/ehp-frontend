import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, tap, throwError } from 'rxjs';
import { MessagesService } from 'src/app/shared/services/messages.service';
import { environment } from 'src/environment/environment';
import { LoginService } from '../../login/services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  userId: string | undefined;

  constructor(
    private http: HttpClient,
    private user: LoginService,
    public messages: MessagesService,
  ) {
    this.userId = this.user.getUserId();
  }

  makeAppointment(data: any) {
    const url = environment.apiUrl + '/appointments/appoint';
    const appointment = {
      ...data,
      userId: this.userId
    }
    return this.http.post(url, appointment).pipe(
      map(res => res),
      catchError(err => {
        const message = 'Something went wrong. Try again later';
        this.messages.showErrors(message);
        console.log(message, err);
        return throwError(err);
      }),
      tap(() => this.messages.showSuccess('You have successfully made an appointment. Wait for a phone call to confirm your appointment'))
    );
  }
}
