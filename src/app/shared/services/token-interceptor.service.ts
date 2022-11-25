import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Router } from '@angular/router';

import { LoginService } from 'src/app/features/login/services/login.service';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(
    private service: LoginService,
    private router: Router
    ) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.service.getToken();
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      });
    }
    return next.handle(request).pipe(
      catchError((err) => {
        if (err.status === 401) {
          this.service.logout();
          this.router.navigate(['/login']);
        }
        const error = err.error.message || err.statusText;
        return throwError(error);
      })
    );
  }
}