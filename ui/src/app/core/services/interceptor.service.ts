import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponseBase
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(
    private route: Router,
    private authService: AuthService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const headers = {
      'Content-Type': 'application/json;charset=utf-8',
    };
    const token = this.authService.getToken();
    if (token) {
      Object.assign(headers, {Authorization: `Bearer ${token}`});
    }
    return next.handle(req.clone({
      setHeaders: headers
    })).pipe(
      catchError((error: any) => this.handleError(this, error))
    );
  }

  private handleError(that, ev: HttpResponseBase): Observable<any> {
    switch (ev.status) {
      case 401:
        that.authService.removeToken();
        that.route.navigate(['/login']);
        break;
    }
    return throwError(ev);
  }
}
