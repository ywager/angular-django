import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { User } from './../models/user';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private http: HttpClient,
  ) { }

  /**
   * Get all users from the API
   *
   */
  getUsers(): Observable<any> {
    return this.http.get('/api/users/')
    .pipe(
      map((response: any) => {
        response.forEach(user => {
          this.formatUser(user);
        });
        return response;
      }),
      catchError((error: any) => this.handleError(error))
    );
  }

  private formatUser(user: User) {
    user.date_joined = formatDate(user.date_joined, 'yyyy-MM-dd hh:mm:ss', 'en');
    return user;
  }

  private handleError(error: any) {
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    return throwError(errMsg);
  }
}
