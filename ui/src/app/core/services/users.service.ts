import { Injectable } from '@angular/core';
import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { MessagesService } from './../../shared/components/messages/services/messages.service';
import { User } from './../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private http: HttpClient,
    private message: MessagesService,
  ) { }

  /**
   * @description
   * Get a list of users.
   *
   * @returns Array. Each item is a user.
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
      catchError((error: any) => this.handleError(error, 'Unable to get user list.'))
    );
  }

  /**
   * @description
   * Create an user. This returns the new user object on success.
   *
   * @param Object newUser
   * The user to create.
   *
   * @param string newUser.username
   * The name of the new user. Required.
   *
   * @param string newUser.password
   * The password of the new user. Required.
   *
   * @returns Object The result of the API call
   */
  createUser(user) {
    return this.http.post('/api/users/', user)
    .pipe(
      map((response: any) => {
        this.formatUser(response);
        return response;
      }),
      catchError((error: any) => this.handleError(error, 'Unable to create user.'))
    );
  }

  private formatUser(user: User) {
    user.date_joined = formatDate(user.date_joined, 'yyyy-MM-dd hh:mm:ss', 'en');
    return user;
  }

  private handleError(error: any, message: string) {
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    this.message.error(message);
    return throwError(errMsg);
  }
}
