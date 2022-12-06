import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { LoginService } from '../../login/services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  userId: string | undefined;

  constructor(
    private http: HttpClient,
    private user: LoginService
  ) {
    this.userId = this.user.getParsedToken()?.userId;
  }

  makeAppointment(data: any) {
    const url = environment.apiUrl + '/appointments/appoint';
    const appointment = {
      ...data,
      userId: this.userId
    }
    return this.http.post(url, appointment);
  }
}
